import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Expense from "../../pages/Dashboard/Expense";
import * as axiosInstanceModule from "../../utils/axiosInstance";
import * as apiPaths from "../../utils/apiPaths";
import toast from "react-hot-toast";

// Helper to flush promises
const flushPromises = () => new Promise(setImmediate);

describe("Expense Page", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should_fetch_and_display_expenses_on_mount", async () => {
    const expenses = [
      { _id: "1", category: "Food", amount: 20, date: "2024-06-01", icon: "🍔" },
      { _id: "2", category: "Transport", amount: 15, date: "2024-06-02", icon: "🚗" },
    ];
    jest.spyOn(axiosInstanceModule.default, "get").mockResolvedValueOnce({ data: expenses });

    render(<Expense />);
    await waitFor(() => {
      expect(screen.getByText("All Expenses")).toBeInTheDocument();
      expect(screen.getByText("Food")).toBeInTheDocument();
      expect(screen.getByText("Transport")).toBeInTheDocument();
    });
  });

  it("should_add_expense_and_update_list", async () => {
    const initialExpenses = [];
    const newExpense = { category: "Books", amount: 30, date: "2024-06-03", icon: "📚" };
    jest.spyOn(axiosInstanceModule.default, "get").mockResolvedValueOnce({ data: initialExpenses });
    jest.spyOn(axiosInstanceModule.default, "post").mockResolvedValueOnce({});
    jest.spyOn(axiosInstanceModule.default, "get").mockResolvedValueOnce({ data: [ { ...newExpense, _id: "3" } ] });

    render(<Expense />);
    await flushPromises();

    fireEvent.click(screen.getByText("Add Expense"));
    fireEvent.change(screen.getByLabelText("Category"), { target: { value: newExpense.category } });
    fireEvent.change(screen.getByLabelText("Amount"), { target: { value: newExpense.amount } });
    fireEvent.change(screen.getByLabelText("Date"), { target: { value: newExpense.date } });

    fireEvent.click(screen.getByText("Add Expense", { selector: "button" }));

    await waitFor(() => {
      expect(screen.getByText("Books")).toBeInTheDocument();
    });
  });

  it("should_download_expense_details_as_excel", async () => {
    const blobData = new Blob(["test"], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    jest.spyOn(axiosInstanceModule.default, "get").mockResolvedValueOnce({ data: blobData });
    Object.defineProperty(window, "URL", {
      value: {
        createObjectURL: jest.fn(() => "blob:http://localhost/fake-url"),
        revokeObjectURL: jest.fn(),
      },
      writable: true,
    });
    const appendChild = jest.spyOn(document.body, "appendChild");
    const removeChild = jest.spyOn(document.body, "removeChild");

    render(<Expense />);
    await flushPromises();

    fireEvent.click(screen.getByText("Download"));

    await waitFor(() => {
      expect(window.URL.createObjectURL).toHaveBeenCalled();
      expect(appendChild).toHaveBeenCalled();
      expect(removeChild).toHaveBeenCalled();
    });
  });

  it("should_show_error_when_adding_expense_with_empty_category", async () => {
    jest.spyOn(axiosInstanceModule.default, "get").mockResolvedValueOnce({ data: [] });
    const toastSpy = jest.spyOn(toast, "error").mockImplementation(() => {});

    render(<Expense />);
    await flushPromises();

    fireEvent.click(screen.getByText("Add Expense"));
    fireEvent.change(screen.getByLabelText("Category"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Amount"), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText("Date"), { target: { value: "2024-06-04" } });

    fireEvent.click(screen.getByText("Add Expense", { selector: "button" }));

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith("Category is required");
    });
  });

  it("should_handle_fetch_expenses_api_failure", async () => {
    jest.spyOn(axiosInstanceModule.default, "get").mockRejectedValueOnce(new Error("Network error"));
    render(<Expense />);
    await flushPromises();
    // Should not crash, and error logged
    expect(screen.getByText("All Expenses")).toBeInTheDocument();
  });

  it("should_not_delete_expense_with_invalid_id_and_show_error", async () => {
    jest.spyOn(axiosInstanceModule.default, "get").mockResolvedValueOnce({ data: [] });
    const toastSpy = jest.spyOn(toast, "error").mockImplementation(() => {});

    render(<Expense />);
    await flushPromises();

    // Open delete modal with invalid id
    fireEvent.click(screen.getByText("Delete", { selector: "button" }));

    // Simulate clicking delete with no id
    fireEvent.click(screen.getByText("Delete", { selector: "button" }));

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith("Failed to delete expense");
    });
  });
});