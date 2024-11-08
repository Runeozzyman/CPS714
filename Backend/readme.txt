Getting Started
Steps:
1: Open Backend Folder in Terminal
2: if Virtual Environment folder .venv is not created, create it using Win:" python -m venv .venv " or for Mac: "pip install virtualenv" then " python3 -m venv .venv "
3: Activate Virtual Environment using Win:" .venv\Scripts\activate " or for Mac:" source .venv/bin/activate "
4: Make sure flask is installed using " pip install flask " and " pip install flask-cors " (if on Mac skip to step 7 after this one)
5: Set Environment Variable " $env:FLASK_APP = "index" "
6: Run the application using " flask --app index run " (not necessary anymore)
7: Run in Debug mode with " python index.py "
8: Check Link 'http://127.0.0.1:8080/api/home'
