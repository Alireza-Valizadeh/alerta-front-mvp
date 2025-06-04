import React, { useEffect, useState } from "react";
import AppBar from "../Components/AppBar";
import BottomNav from "../Components/BottomNav";
import { getUserTransactions } from "../services/api";
import { formatPersianDateTime, toPersianNumberWithSign } from "../utils/formatters";
import toast from "react-hot-toast";
import "../styles/CreditsPage.css";

const transactionTypeLabels = {
  PURCHASE: "خرید اعتبار",
  USAGE: "هزینه ارسال",
  BONUS: "اعتبار هدیه",
  REFUND: "بازگشت اعتبار",
  ADJUSTMENT: "تغییر دستی ادمین",
};

const CreditsPage = () => {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getUserTransactions()
      .then((data) => {
        setBalance(data.balance || 0);
        setTransactions(data.transactions || []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("خطا در دریافت اطلاعات تراکنش‌ها");
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-wrapper credits-page-wrapper">
      <AppBar />
      <main className="credits-page-content">
        <div className="credits-balance-card">
          <div className="credits-balance-label">اعتبار</div>
          <div className={`credits-balance-amount${balance < 0 ? " negative" : ""}`}>
            {toPersianNumberWithSign(balance)} پیامک
          </div>
        </div>
        <div className="credits-transactions-section">
          <div className="credits-transactions-header">
            <h2>تراکنش‌ها</h2>
          </div>
          {loading ? (
            <div className="credits-loading">در حال بارگذاری...</div>
          ) : transactions.length === 0 ? (
            <div className="credits-no-transactions">تراکنشی وجود ندارد.</div>
          ) : (
            <div className="credits-transactions-list">
              {transactions.map((tx) => (
                <div className="credits-transaction-card" key={tx.id}>
                  <div className="credits-transaction-row">
                    <span className={`credits-transaction-amount ${tx.amount > 0 ? "positive" : "negative"}`}>
                      {" "}
                      {toPersianNumberWithSign(tx.amount)} پیامک
                    </span>
                    <span className={`credits-transaction-type ${tx.amount > 0 ? "positive" : "negative"}`}>
                      {transactionTypeLabels[tx.type] || tx.type}
                    </span>
                  </div>
                  <div className="credits-transaction-row credits-transaction-desc-row">
                    <span className="credits-transaction-desc">{tx.description || "-"}</span>
                    <span className="credits-transaction-date">
                      {tx.createdAt ? formatPersianDateTime(tx.createdAt) : "-"}
                    </span>
                  </div>
                  <div
                    className={`credits-transaction-balance-after ${
                      Number(tx.balanceAfter) > 0 ? "positive" : Number(tx.balanceAfter) < 0 ? "negative" : ""
                    }`}
                  >
                    موجودی پس از تراکنش: {toPersianNumberWithSign(tx.balanceAfter)} پیامک
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default CreditsPage;
