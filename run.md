# How to Run the Todo Console App

This document provides a quick guide on how to set up and run the Todo Console Application.

## 1. Prerequisites

Ensure you have the following installed on your system:

-   **Python 3.13 or newer**
-   **`uv` package manager**: If you don't have `uv` installed, you can install it using pip:
    ```bash
    pip install uv
    ```

## 2. Setup the Environment

Navigate to the project's root directory in your terminal and follow these steps:

### 2.1 Create a Virtual Environment

It's recommended to use a virtual environment to manage project dependencies.

```bash
uv venv
```

### 2.2 Activate the Virtual Environment

Activate the virtual environment you just created.

-   **On Windows (Command Prompt):**
    ```bash
    .venv\Scripts\activate
    ```
-   **On Windows (PowerShell):**
    ```powershell
    .venv\Scripts\Activate.ps1
    ```
-   **On macOS/Linux:**
    ```bash
    source .venv/bin/activate
    ```

### 2.3 Install Dependencies (Optional)

This project currently has no external dependencies beyond Python's standard library. However, if any were added in future phases, you would install them like this:

```bash
uv pip install -r requirements.txt
```

## 3. Run the Application

Once the virtual environment is activated, you can start the application:

```bash
python main.py
```

The application's command-line interface will then be displayed in your terminal.
