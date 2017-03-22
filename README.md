# F1 Classification

## Goal

Build a JavaScript web application that consists on a 3-tab chart of F1
championship drivers.
In each tab, drivers are ordered by points, name, and nationality.

### Requirements

- Create a webpage and load the JSON data file via AJAX.
- Layout the chart in HTML5.
- Write the JavaScript code necessary to switch between tabs and reorder the
drivers.
- Write the application logic in Object Oriented vanilla JavaScript. Don’t use
any framework, except for DOM manipulation and loading data.
- Make the application as much modular, configurable and scalable as possible.
Try to decouple between presentation, behavior and data loading.
- Render drivers in a template-oriented way.
- The initial order is by points.
- Data file must be loaded only once for all the tabs, don’t load again when
switching between
tabs.
- Use a single HTML block for each driver and reuse it in every tab, don’t
create new HTML
blocks when switching between tabs.
- Use any MV-X pattern (MVC, MVVM,...) to structure the application. By your
own, not using frameworks.
- Implement Unit Tests for the application with any testing framework of your
choice.
- Make each tab linkable using hash tags or HTML5 History API.
- Add some effect to transition between tabs.
- Add drag & drop functionality to reorder drivers in the list. Switching to a
new tab must restore original order for the drivers on that tab.
