
# Elevatr — Career Advisor

A complete career advisory platform built with **React + Vite + Tailwind** (Frontend) and **Node.js + Express + Python FastAPI** (Backend). It integrates **Firebase Authentication** & **Firestore** for user management and real-time data, along with an AI-powered backend (FastAPI). The project is designed to be hosted on **Amazon EC2** and includes integration with **Gemini AI** (store your Gemini API key securely and use it from the FastAPI AI backend).

🌐 Live Website: [http://52.76.65.88/](http://52.76.65.88/)  

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Local setup](#local-setup)
  - [Prerequisites](#prerequisites)
  - [Frontend (React + Vite + Tailwind)](#frontend-react--vite--tailwind)
  - [Backend - Node.js + Express (API)](#backend---nodejs--express-api)
  - [AI Backend - Python FastAPI](#ai-backend---python-fastapi)
- [Gemini AI integration](#gemini-ai-integration)
- [Environment variables (.env.example)](#environment-variables-envexample)
- [Deployment (Amazon EC2)](#deployment-amazon-ec2)
- [Security & secrets](#security--secrets)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Elevatr is an AI-assisted career guidance platform for students and early-career professionals. It combines a polished frontend with two backend services:

- **Node.js + Express**: primary REST API for authentication flows, user profiles, job/internship listings, and realtime features that read/write to Firestore.
- **Python FastAPI**: AI backend that handles prompts, model orchestration (Gemini), and heavier AI-related tasks (resume review, personalized learning path generation, interview question generation, etc.).

Authentication and realtime user data are powered by Firebase (Auth + Firestore). The app is intended to run on EC2 for production.

## Features

- Firebase Authentication (Email/Google)
- Firestore for user profiles, sessions, activity logs
- Responsive React frontend with Vite + Tailwind
- REST APIs with Node.js + Express
- AI endpoints powered by a Python FastAPI service and Gemini AI
- Deployment-ready instructions for Amazon EC2

## Tech stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- AI Backend: Python, FastAPI, Uvicorn
- Auth & DB: Firebase Authentication, Firestore
- Hosting: Amazon EC2
- AI model: Gemini AI (API key stored in server-side env / secrets manager)

## Architecture

1. User <-> React frontend (Vite, Tailwind)  
2. Frontend calls Node.js/Express REST API for application data / Firestore proxying (where relevant)  
3. For AI features, Node or frontend calls the FastAPI AI service (internal/private endpoint) which then calls Gemini model via the provider API using a secure server-side key  
4. Firestore stores user profiles, activity, saved prompts and results

---

## Local setup

### Prerequisites

- Node.js (v16+)
- Python 3.10+
- pip
- Firebase account & project
- An (optional) Gemini AI API key
- AWS account for EC2 deployment (optional for development)

### Frontend (React + Vite + Tailwind)




