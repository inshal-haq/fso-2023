sequenceDiagram
    participant browser
    participant server

    Note right of browser: First, the new note is added to the list and the DOM is then dynamically updated

    browser->>server: POST { "content": "user-input", "date": "date-of-input" } to https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: note created (Status 201)
    deactivate server

    Note right of browser: User calls post api when Save button clicked