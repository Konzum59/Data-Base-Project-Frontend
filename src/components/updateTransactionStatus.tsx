"use client";
import { useState } from "react";
import { useUser } from "./getUserData";

interface TransactionResponse {
  id: number;
  status: string;
  transaction_date: string;
  seller: number;
  buyer: number;
  listing: number;
}

interface UpdateTransactionStatusProps {
  transactionId: number;
}

export default function UpdateTransactionStatus({
  transactionId,
}: UpdateTransactionStatusProps) {
  const { accessToken } = useUser();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionData, setTransactionData] =
    useState<TransactionResponse | null>(null);

  // Funkcja do zmiany statusu
  const updateStatus = async (newStatus: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/transactions/${transactionId}/update/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Backend error: ${errorDetails}`);
      }

      const data: TransactionResponse = await response.json();
      setTransactionData(data);
      setSuccess(true);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Error occurred: ${err.message}`);
      }
    }
  };

  return (
    <div>
      <div>
        <h3>Change Status of Transaction #{transactionId}</h3>
        <button
          className="bg-cyan-900 text-white hover:bg-cyan-700 p-2 rounded-md"
          onClick={() => updateStatus("pending")}
        >
          Set as Pending
        </button>
        <button
          className="bg-green-900 text-white hover:bg-green-700 p-2 rounded-md"
          onClick={() => updateStatus("completed")}
        >
          Set as Completed
        </button>
        <button
          className="bg-red-900 text-white hover:bg-red-700 p-2 rounded-md"
          onClick={() => updateStatus("cancelled")}
        >
          Set as Cancelled
        </button>
      </div>

      {success && transactionData && (
        <p style={{ color: "green" }}>
          Transaction updated successfully! New status: {transactionData.status}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
