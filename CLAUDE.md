# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML website for "Cafetería Gonzales", a coffee shop menu website written entirely in Spanish. The project consists of a single `index.html` file that displays an interactive coffee menu with detailed recipes and preparation instructions.

## Architecture

- **Single-file structure**: The entire website is contained in one HTML file (`index.html`)
- **Self-contained**: All CSS styles are embedded in `<style>` tags within the HTML
- **Vanilla JavaScript**: Simple interactive functionality using inline JavaScript
- **No build process**: Static HTML file that can be opened directly in a browser

## Key Features

- Interactive coffee menu cards that expand/collapse to show detailed recipes
- Responsive grid layout using CSS Grid
- Coffee emoji favicon and styling with coffee shop theme colors
- External image from Unsplash for visual appeal
- Accordion-style interaction where only one card can be expanded at a time

## Development Workflow

Since this is a static HTML file with no build process:
- **Local development**: Simply open `index.html` in a web browser
- **Live reload**: Use browser refresh to see changes
- **No package management**: No npm, yarn, or other package managers required

## Content Structure

The menu includes:
- Basic coffee drinks (Espresso, Café con leche, Capuchino, etc.)
- Specialty drinks (Latte Macchiato, Mocha, Flat White)
- House special (Latte Macchiato Miel y Canela)
- Each item includes ingredients list and step-by-step preparation instructions

## Styling Notes

- Color scheme: Coffee-themed browns (#6d4c41, #3e2723) with cream background (#f5e6d3)
- Typography: Georgia serif font for elegant appearance
- Hover effects and smooth transitions for better UX
- Cards use box-shadow for depth and visual hierarchy

## Interactive Functionality

The `toggleDetails()` JavaScript function manages the expand/collapse behavior:
- Closes all currently open recipe details
- Opens only the clicked card's details
- Ensures only one recipe is visible at a time