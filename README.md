# AI-Powered Calculator

## 🚀 Overview
The **AI-Powered Calculator** is a smart and interactive application that allows users to perform both **basic and complex mathematical calculations** using hand-drawn inputs. The app utilizes **Google's Gemini API** to recognize and process mathematical expressions, including algebraic and physics-based problems. Additionally, users can draw **random shapes, flags, and diagrams** using a built-in canvas with a color selection feature.

## ✨ Features
- 🖊️ **Handwritten Expression Recognition** – Draw mathematical expressions (e.g., `2 + 3 * 5 / 10`), and the app will compute the result using the **Gemini API**.
- 🎨 **Canvas Drawing Support** – Users can draw **shapes, flags, and diagrams** using the **color selection tool**.
- 🧠 **Complex Physics Calculations** – Supports **diagrammatic representation** for physics-related equations and problem-solving.
- 📡 **AI Integration** – Uses the **Gemini API** to process mathematical expressions and return accurate results.
- ⚡ **Real-time Processing** – Fast and interactive calculation experience.

## 🛠️ Tech Stack
### **Frontend:**
- **React.js** – For building the user interface.

### **Backend:**
- **FastAPI** – Python-based backend framework.
- **Gemini API** – For AI-based mathematical computation.

## 📸 Screenshots
![Image](https://github.com/user-attachments/assets/ff674af0-a111-415d-bdd3-45bbe79498c8)

![Image](https://github.com/user-attachments/assets/8c0ecbe1-1362-45af-86fe-975947d44254)

## 🔧 Installation & Setup
### **Backend Setup (FastAPI)**

# Clone the repository
git clone https://github.com/your-username/ai-calculator.git
cd backend

# Create a virtual environment
python -m venv venv
On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
uvicorn main:app --reload


### **Frontend Setup (React)**

cd frontend

# Install dependencies
 npm install

# Start the React app
or npm run dev
```

## 🚀 Usage
1. Open the app in your browser (`http://localhost:5173`).
2. Draw your mathematical expression on the canvas.
3. Click the **Calculate** button to get results from the **Gemini API**.
4. Use the color palette to draw custom shapes, diagrams, or flags.
5. Enjoy an interactive and AI-powered drawing & calculation experience!


## 📜 License
This project is open-source and available under the **MIT License**.

## 💡 Future Enhancements
- ✨ **Handwriting Recognition Improvements**
- 🔥 **Support for More Complex Mathematical Expressions**

---
_Developed with ❤️ using React, FastAPI, and Gemini AI._

