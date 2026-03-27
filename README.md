#  Smart Expense Splitter

A high-performance, intuitive web application designed to automate group expense tracking and simplify debt settlements. This project was developed as a technical submission for the **NeevAI Internship 2026**.

---

##  Core Features & Engineering Logic

###  1. Smart AI Categorization
The application uses **Keyword-Driven Logic (NLP)** to automatically categorize expenses based on descriptions. 
* **How it works:** Keywords like "Dinner," "Taxi," or "Rent" are mapped to specific categories (Food, Travel, Housing) in real-time, reducing manual effort.

###  2. Optimized Debt Minimization
I implemented a **Greedy Algorithm** to simplify complex group debts into the **minimum number of transactions** possible. 
* **The Goal:** Instead of every member paying multiple people, the system calculates the most efficient payment path to clear all balances.

###  3. Flexible Splitting Engine
* **Equal Split:** Default distribution across all group members.
* **Custom Shares:** Manual input validation ensuring the sum of shares matches the total expense, preventing accounting errors.

---

##  Technical Architecture
* **Frontend:** HTML5 & CSS3 (Clean, Responsive UI)
* **Logic Engine:** Vanilla JavaScript (ES6+) — *Chosen for maximum performance and zero dependency overhead.*
* **Deployment:** Vercel (CI/CD Pipeline via GitHub)

---

##  Demo Scenario (Arun, Arjun, Hari, & Ram)
1. **Add Members:** Input **Arun, Arjun, Hari, and Ram**.
2. **Standard Expense:** Add **₹1200 for "Dinner"** paid by Arun (Equal Split).
3. **Custom Expense:** Add **₹500 for "Taxi"** paid by Arjun (Custom shares: 100, 200, 100, 100).
4. **Result:** View the **Settlement Summary** for the simplified payment path and **Spending Analytics** for category-wise totals.

---

 Author
Aravind Bandi| 3rd Year B.Tech CSE (AI/ML) Student | CGPA: 9.38 Email:aravind.bandi1845@gmail.com
