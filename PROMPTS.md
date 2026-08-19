# AI Prompt Log

This project was developed with AI assistance during the implementation and refinement process. 
The prompts below document the major development iterations, including document analysis, dynamic rendering, print-layout handling, pagination, visual fidelity improvements, and validation.

---

## Prompt 1: Initial Requirements Analysis & Project Architecture

- **Tool:** AI Assistant
- **Objective:** Establish the project structure and understand the two supplied PDF exercises before implementation.

- **Prompt:**

> Analyze the two supplied reference PDFs for the Diona Technologies screening assignment in detail before writing implementation code.
>
> Identify:
> - page dimensions
> - page count
> - headers and footers
> - logos/images
> - typography
> - section structure
> - static vs dynamic content
> - form fields
> - checkboxes/radio groups
> - repeating tables
> - table columns
> - fields that may contain variable-length data
> - page-numbering behavior
> - elements that need to remain fixed
> - elements that may expand
>
> Based on this analysis, propose a simple architecture using only HTML, CSS, and vanilla JavaScript.
>
> The implementation must be data-driven rather than hardcoding the submitted values from the PDFs.
>
> The same rendering logic should be capable of displaying different datasets.

---

## Prompt 2: Exercise 1 — Worker Progress Report

- **Tool:** AI Assistant
- **Objective:** Implement the first reference document with dynamic data.

- **Prompt:**

> Implement Exercise 1, the Worker Progress Report, using pure HTML5, CSS3, and vanilla JavaScript.
>
> Reproduce the supplied PDF as closely as possible, including:
> - WCB header and logo
> - organization information
> - claim information
> - worker information
> - dates
> - checkboxes/radio controls
> - text areas
> - section borders
> - footer
> - page numbers
> - typography and spacing
>
> Do not hardcode the submitted values directly into the HTML.
>
> Create a data object representing the document's dynamic values and build the document from that data.
>
> Create multiple datasets with meaningfully different values so that the same template can be demonstrated with different data.
>
> Include a simple browser interface for switching between datasets.
>
> Ensure the reference dataset reproduces the original document's page structure.

---

## Prompt 3: Exercise 1 — Dynamic Data Binding

- **Tool:** AI Assistant
- **Objective:** Make the document genuinely data-driven rather than a static reproduction.

- **Prompt:**

> Refactor the Worker Progress Report so that all variable content is driven by a centralized JavaScript data object.
>
> Identify every field in the reference document that can change between submissions.
>
> Create a generic binding mechanism so that changing the dataset updates the corresponding document fields without rebuilding the HTML manually.
>
> Ensure:
> - text fields update correctly
> - dates update correctly
> - checkboxes update correctly
> - radio selections update correctly
> - multiline text updates correctly
> - empty values are handled gracefully
>
> Keep static labels and document structure separate from dynamic submission data.

---

## Prompt 4: Exercise 2 — Medical & Travel Expense Request

- **Tool:** AI Assistant
- **Objective:** Implement the second and more dynamic reference document.

- **Prompt:**

> Implement Exercise 2, the Medical & Travel Expense Request, using pure HTML5, CSS3, and vanilla JavaScript.
>
> Analyze the supplied PDF and reproduce:
> - header
> - logo
> - introductory content
> - all repeating expense sections
> - table headers
> - table columns
> - checkbox/radio fields
> - currency values
> - footer
> - page numbering
> - spacing and borders
>
> Identify all repeating data structures in the document.
>
> Do not hardcode individual table rows.
>
> Represent the repeating sections as JavaScript arrays and render the rows dynamically.
>
> Create:
> 1. a reference dataset matching the supplied PDF
> 2. a small dataset
> 3. a large dataset containing many rows
>
> The same document template must render all three datasets.

---

## Prompt 5: Dynamic Table Rendering

- **Tool:** AI Assistant
- **Objective:** Ensure Exercise 2 handles variable numbers of records.

- **Prompt:**

> Refactor the Medical & Travel Expense Request tables so that they are generated entirely from arrays in the document data.
>
> Every table should support:
> - zero records
> - one record
> - multiple records
> - many records
>
> Empty tables should display an appropriate empty state without breaking the document layout.
>
> Ensure column definitions and row rendering remain consistent regardless of dataset size.
>
> Do not create separate hardcoded HTML structures for each dataset.

---

## Prompt 6: Fixed Physical Page Layout

- **Tool:** AI Assistant
- **Objective:** Correct the difference between normal responsive web layout and fixed document layout.

- **Prompt:**

> The generated documents are print documents rather than ordinary responsive webpages.
>
> Refactor the document CSS so that each report page has a fixed physical size matching the supplied PDF.
>
> Establish:
> - fixed page width
> - fixed page height
> - controlled margins
> - predictable header/footer positions
> - stable section dimensions
> - print-specific styles
>
> The browser viewport may scale the document visually, but the internal report dimensions must not depend on viewport width.
>
> Prevent normal responsive flex/grid reflow from unexpectedly changing the document structure.

---

## Prompt 7: Print CSS & PDF Output

- **Tool:** AI Assistant
- **Objective:** Make browser printing reproduce the intended document pages.

- **Prompt:**

> Optimize the report renderer for browser printing and PDF export.
>
> Implement appropriate @page configuration and print media styles.
>
> When printing:
> - hide dataset controls
> - hide editing controls
> - preserve document backgrounds and borders
> - preserve page dimensions
> - preserve header/footer positions
> - prevent unwanted margins
> - preserve page breaks
> - prevent table rows from being split where inappropriate
>
> Verify that the generated print output has the same physical page structure as the reference document.

---

## Prompt 8: Dynamic Pagination for Exercise 2

- **Tool:** AI Assistant
- **Objective:** Handle large datasets without destroying the reference layout.

- **Prompt:**

> Implement controlled pagination for the repeating tables in the Medical & Travel Expense Request.
>
> The reference dataset must preserve the original page structure.
>
> When a dataset contains additional rows:
> - detect when the available page area is exhausted
> - create a new physical page
> - continue the table
> - repeat the table header
> - preserve column widths
> - preserve row styling
> - update Page X of Y
>
> Do not allow the entire document to freely reflow like a normal webpage.
>
> Test with:
> - zero rows
> - one row
> - several rows
> - 10+ rows
> - 20+ rows

---

## Prompt 9: Live Form ↔ JSON State

- **Tool:** AI Assistant
- **Objective:** Demonstrate the relationship between user-entered data and generated output.

- **Prompt:**

> Add a lightweight data-entry interface for the dynamic document.
>
> Use a centralized JavaScript submissionData object as the live source of truth.
>
> The data flow should be:

> Form input
> → submissionData
> → document renderer

> Changes to submissionData should update:
> - form values
> - rendered document
>
> Do not modify physical seed JSON files on every keystroke.
>
> The JSON files should act as initial datasets, while submissionData represents the current live state.
>
> Keep the binding generic and template-driven.

---

## Prompt 10: Visual Fidelity Correction Pass

- **Tool:** AI Assistant
- **Objective:** Correct visual discrepancies discovered during testing.

- **Prompt:**

> Perform a visual fidelity audit of both generated documents against the supplied reference PDFs.
>
> Do not assume the current implementation is correct.
>
> Check page-by-page:
> - page dimensions
> - page count
> - header position
> - logo size and position
> - typography
> - section spacing
> - borders
> - field positions
> - checkbox/radio alignment
> - table widths
> - row heights
> - footer position
> - page numbers
>
> Identify discrepancies and correct the implementation.
>
> The reference dataset must remain visually stable and must not unexpectedly gain additional pages.

---

## Prompt 11: Dynamic Dataset Verification

- **Tool:** AI Assistant
- **Objective:** Verify that the solution is genuinely data-driven.

- **Prompt:**

> Test both exercises using multiple datasets.
>
> Exercise 1:
> - reference dataset
> - alternate dataset
>
> Exercise 2:
> - reference dataset
> - small dataset
> - large dataset
>
> Verify that changing the dataset changes only the dynamic content while preserving the document structure.
>
> Specifically verify:
> - names
> - dates
> - selections
> - text areas
> - table rows
> - amounts
> - page numbers
> - pagination
>
> Report any hardcoded values or reference-specific rendering logic that would prevent a different dataset from working.

---

## Prompt 12: Hardcoding & Genericity Audit

- **Tool:** AI Assistant
- **Objective:** Ensure the renderer is not secretly designed only for the supplied PDFs.

- **Prompt:**

> Perform a complete hardcoding audit.
>
> Search the implementation for:
> - hardcoded submitted values
> - hardcoded worker names
> - hardcoded claim numbers
> - hardcoded expense rows
> - reference-specific conditional rendering
> - dataset-specific HTML
> - renderer logic that only works for the two supplied forms
>
> The generic renderer should operate on template configuration and data.
>
> Reference-specific layout information may exist in template configuration, but the rendering engine itself must not contain business-specific values.
>
> Create a synthetic third dataset/template to verify that the renderer can handle a structurally different document.

---

## Prompt 13: Final Regression & Submission Audit

- **Tool:** AI Assistant
- **Objective:** Perform a final verification before submission.

- **Prompt:**

> Perform a final end-to-end audit of the Diona Technologies assignment.
>
> Verify:
>
> Exercise 1:
> - reference dataset
> - alternate dataset
> - correct page count
> - correct layout
> - dynamic values
> - print output
>
> Exercise 2:
> - reference dataset
> - small dataset
> - large dataset
> - dynamic tables
> - pagination
> - repeated table headers
> - Page X of Y
> - print output
>
> Also verify:
> - HTML/CSS/JavaScript requirement
> - no static screenshot-based implementation
> - no hardcoded submitted data
> - dynamic dataset switching
> - live data binding
> - browser functionality
> - print functionality
>
> Do not claim an item passes unless it has actually been tested.
>
> Provide a final list of:
> - completed requirements
> - remaining issues
> - known limitations
> - files changed
> - tests performed

---

## Prompt 14: Final Code Cleanup

- **Tool:** AI Assistant
- **Objective:** Clean the implementation without changing functionality.

- **Prompt:**

> Perform a final code-quality pass without changing the application's behavior.
>
> Remove:
> - dead code
> - unused CSS
> - duplicate rendering logic
> - unused datasets
> - debugging statements
> - unnecessary dependencies
>
> Ensure:
> - HTML is valid
> - CSS is organized
> - JavaScript is readable
> - functions have clear responsibilities
> - data and rendering remain separated
> - no assignment functionality is accidentally removed
>
> Do not introduce new features during this pass.
