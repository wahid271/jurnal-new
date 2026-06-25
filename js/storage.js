/* ==========================================
   TRADING JOURNAL STORAGE
   LocalStorage Database
========================================== */

const STORAGE_KEY = "trading_journal_v1";

/* ==========================================
   Ambil Semua Trade
========================================== */

function getTrades() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("Data rusak:", error);
        return [];
    }

}

/* ==========================================
   Simpan Semua Trade
========================================== */

function saveTrades(trades) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(trades)
    );

}

/* ==========================================
   Tambah Trade
========================================== */

function addTrade(trade) {

    const trades = getTrades();

    trade.id = Date.now();

    trades.unshift(trade);

    saveTrades(trades);

}

/* ==========================================
   Cari Trade
========================================== */

function findTrade(id) {

    return getTrades().find(
        trade => trade.id === id
    );

}

/* ==========================================
   Update Trade
========================================== */

function updateTrade(id, newData) {

    const trades = getTrades();

    const index = trades.findIndex(
        trade => trade.id === id
    );

    if (index !== -1) {

        trades[index] = {

            ...trades[index],

            ...newData

        };

        saveTrades(trades);

    }

}

/* ==========================================
   Hapus Trade
========================================== */

function deleteTrade(id) {

    const trades = getTrades().filter(

        trade => trade.id !== id

    );

    saveTrades(trades);

}

/* ==========================================
   Hapus Semua Data
========================================== */

function clearTrades() {

    localStorage.removeItem(STORAGE_KEY);

}

/* ==========================================
   Hitung Win Rate
========================================== */

function getWinRate() {

    const trades = getTrades();

    if (trades.length === 0) {

        return 0;

    }

    const win = trades.filter(

        trade => trade.result === "Win"

    ).length;

    return ((win / trades.length) * 100).toFixed(1);

}

/* ==========================================
   Total Profit
========================================== */

function getTotalProfit() {

    const trades = getTrades();

    let total = 0;

    trades.forEach(trade => {

        total += Number(trade.profit);

    });

    return total.toFixed(2);

}

/* ==========================================
   Average RR
========================================== */

function getAverageRR() {

    const trades = getTrades();

    if (trades.length === 0) {

        return 0;

    }

    let total = 0;

    trades.forEach(trade => {

        total += Number(trade.rr);

    });

    return (total / trades.length).toFixed(2);

}

/* ==========================================
   Total Win
========================================== */

function getTotalWin() {

    return getTrades().filter(

        trade => trade.result === "Win"

    ).length;

}

/* ==========================================
   Total Loss
========================================== */

function getTotalLoss() {

    return getTrades().filter(

        trade => trade.result === "Loss"

    ).length;

}

/* ==========================================
   Trade Terbaru
========================================== */

function getRecentTrades(limit = 5) {

    return getTrades().slice(0, limit);

}

/* ==========================================
   Export JSON
========================================== */

function exportTrades() {

    const data = JSON.stringify(

        getTrades(),

        null,

        2

    );

    const blob = new Blob(

        [data],

        {

            type: "application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "TradingJournal.json";

    a.click();

    URL.revokeObjectURL(url);

}

/* ==========================================
   Import JSON
========================================== */

function importTrades(file) {

    const reader = new FileReader();

    reader.onload = function (event) {

        try {

            const trades = JSON.parse(

                event.target.result

            );

            saveTrades(trades);

            alert("Data berhasil diimport.");

            location.reload();

        } catch {

            alert("File JSON tidak valid.");

        }

    };

    reader.readAsText(file);

}
