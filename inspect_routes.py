#!/usr/bin/env python3
# Script to inspect the backend routes

import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'backend'))

# Change to the backend directory to ensure proper imports
original_cwd = os.getcwd()
os.chdir(os.path.join(original_cwd, 'backend'))

try:
    from main import app

    print("=== BACKEND ROUTES INSPECTION ===")
    print(f"App title: {getattr(app, 'title', 'Unknown')}")
    print(f"Number of routes: {len(app.routes)}")
    print()

    for i, route in enumerate(app.routes):
        print(f"Route {i+1}:")
        print(f"  Type: {type(route).__name__}")

        # Check if it's an APIRoute
        if hasattr(route, 'methods') and hasattr(route, 'path'):
            methods = getattr(route, 'methods', 'N/A')
            path = getattr(route, 'path', 'N/A')
            name = getattr(route, 'name', getattr(route, '__name__', 'N/A'))
            print(f"  Methods: {methods}")
            print(f"  Path: {path}")
            print(f"  Name: {name}")
        else:
            print(f"  Attributes: {[attr for attr in dir(route) if not attr.startswith('_')]}")
            if hasattr(route, 'path'):
                print(f"  Path: {getattr(route, 'path', 'N/A')}")
        print()

    print("=== END ROUTES INSPECTION ===")
finally:
    # Restore original working directory
    os.chdir(original_cwd)