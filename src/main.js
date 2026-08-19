/**
 * Main Application Script (Pure Vanilla JavaScript)
 * Powers the WCB Manitoba Document Generator Suite without TypeScript.
 */

import { WCB_LOGO_SVG, ex1Presets, ex2Presets } from './data.js';

// Application State
const state = {
  activeExercise: 'ex1',      // 'ex1' | 'ex2'
  activePresetEx1: 'minimal', // 'minimal' | 'recovery' | 'complex'
  activePresetEx2: 'single',  // 'single' | 'stress' | 'empty'
  viewMode: 'document',       // 'document' | 'split' | 'editor'
  zoomLevel: 100,
  ex1Data: JSON.parse(JSON.stringify(ex1Presets.minimal)),
  ex2Data: JSON.parse(JSON.stringify(ex2Presets.single)),
};

// Helper: Format Money
function formatMoney(val) {
  if (val === undefined || val === null || isNaN(Number(val))) return '$0.00';
  return '$' + Number(val).toFixed(2);
}

// Helper: Render Checkbox
function renderCheckbox(checked, label = '') {
  const boxHtml = checked
    ? `<span class="chk-box checked">✓</span>`
    : `<span class="chk-box"></span>`;
  return `<span style="display: inline-flex; align-items: center; cursor: pointer; user-select: none;">${boxHtml}${label ? `<span>${label}</span>` : ''}</span>`;
}

// Show Toast Notification
function showToast(msg) {
  const existing = document.querySelector('.toast-msg');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-msg no-print';
  toast.innerHTML = `<span>${msg}</span><button onclick="this.parentElement.remove()" style="background:none; border:none; color:#fff; cursor:pointer; font-weight:bold; margin-left:8px;">✕</button>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 4000);
}

// ----------------------------------------------------
// EXERCISE 1: WORKER PROGRESS REPORT RENDERER
// ----------------------------------------------------
function renderExercise1HTML(data, isPrint = false) {
  const scaleStyle = isPrint ? '' : `transform: scale(${state.zoomLevel / 100});`;
  return `
    <div class="wcb-document-sheet" style="${scaleStyle}">
      <div>
        <!-- 3-Column Official Top Header -->
        <header class="doc-top-header">
          <div class="doc-logo-col">
            ${WCB_LOGO_SVG}
          </div>

          <div class="doc-address-col">
            <p>333 Broadway</p>
            <p>Winnipeg, MB R3C 4W3</p>
            <p>Phone: (204) 954-4321</p>
            <p>Toll Free: 1-855-954-4321</p>
            <p><a href="https://wcb.mb.ca" target="_blank" rel="noreferrer" style="color: #005792; text-decoration: underline;">wcb.mb.ca</a></p>
          </div>

          <div class="doc-title-col">
            <h1 class="doc-main-title">Worker Progress Report</h1>
            <div class="claim-badge-box">
              <div class="claim-badge-num">Claim No. ${data.claimNo}</div>
              <div class="claim-badge-code">${data.formId}</div>
            </div>
          </div>
        </header>

        <!-- Intro line -->
        <p style="font-size: 13px; font-weight: 500; margin-bottom: 14px;">
          <strong>${data.workerName}</strong> provided the following updates in relation to their claim:
        </p>

        <!-- Section: Return to Work -->
        <div class="break-avoid">
          <h2 style="font-size: 14px; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 8px;">Return to Work</h2>
          
          <div class="doc-box">
            <p style="font-size: 11px; color: #475569; margin-bottom: 4px;">Select one:</p>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <div>${renderCheckbox(data.workStatus === 'not_missed', 'I have not missed time from work')}</div>
              <div>${renderCheckbox(data.workStatus === 'off_work', 'I have not returned to work')}</div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                ${renderCheckbox(data.workStatus === 'returned_regular' || data.workStatus === 'returned_modified', 'I returned to work on:')}
                <span class="line-input">${data.returnDate || '—'}</span>
                <span style="font-size: 11px; color: #475569;">(Date)</span>
              </div>
            </div>
          </div>

          <div class="doc-box">
            <p style="font-size: 11px; color: #475569; margin-bottom: 4px;">I am working:</p>
            <div style="display: flex; flex-wrap: wrap; gap: 16px;">
              <div>${renderCheckbox(data.workingMode === 'full_regular', 'Full duties, regular hours')}</div>
              <div>${renderCheckbox(data.workingMode === 'full_reduced', 'Full duties, reduced hours')}</div>
              <div>${renderCheckbox(data.workingMode === 'modified_regular', 'Modified duties, regular hours')}</div>
              <div>${renderCheckbox(data.workingMode === 'modified_reduced', 'Modified duties, reduced hours')}</div>
            </div>
            ${data.otherWorkText ? `<div style="margin-top: 6px; font-size: 11.5px;"><strong>Other details:</strong> ${data.otherWorkText}</div>` : ''}
          </div>

          <div class="doc-box">
            <p style="font-weight: bold; margin-bottom: 4px;">My return to work is going:</p>
            <div>${data.returnGoing || '—'}</div>
          </div>
        </div>

        <!-- Section: Recovery & Treatment -->
        <div class="break-avoid" style="margin-top: 10px;">
          <h2 style="font-size: 14px; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 8px;">Recovery & Treatment Updates</h2>
          
          <div class="doc-box">
            <p style="font-size: 11px; color: #475569; margin-bottom: 4px;">Current Recovery Status:</p>
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
              <div>${renderCheckbox(data.recoveryStatus === 'fully_recovered', 'Fully Recovered')}</div>
              <div>${renderCheckbox(data.recoveryStatus === 'improving', 'Improving')}</div>
              <div>${renderCheckbox(data.recoveryStatus === 'not_fully_recovered', 'Not Fully Recovered / Treatment Ongoing')}</div>
            </div>
            ${data.recoveryComments ? `<div style="margin-top: 6px; font-size: 11.5px;"><strong>Notes:</strong> ${data.recoveryComments}</div>` : ''}
          </div>

          <!-- Pain Checklist Rating 1-10 -->
          <div class="doc-box">
            <p style="font-weight: bold; margin-bottom: 6px;">Pain / Discomfort Rating (Scale 1 to 10):</p>
            <div style="display: flex; gap: 4px; justify-content: space-between;">
              ${[1,2,3,4,5,6,7,8,9,10].map(n => `
                <div style="flex: 1; text-align: center; border: 1px solid #000; padding: 4px 2px; font-size: 11px; font-weight: bold; background: ${Number(data.painScore) === n ? '#000' : '#fff'}; color: ${Number(data.painScore) === n ? '#fff' : '#000'};">
                  ${n}
                </div>
              `).join('')}
            </div>
          </div>

          <div class="doc-box">
            <p style="font-weight: bold; margin-bottom: 4px;">Healthcare Provider & Therapy Visits:</p>
            <table class="wcb-table">
              <thead>
                <tr>
                  <th>Provider / Treatment Type</th>
                  <th>Last Visit Date</th>
                  <th>Last Provider Name</th>
                  <th>Next Scheduled Visit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${data.providerType || 'General Practitioner / Physiotherapy'}</td>
                  <td>${data.lastTreatmentDate || '—'}</td>
                  <td>${data.lastTreatmentProvider || 'Dr. Best'}</td>
                  <td>${data.nextTreatmentDate || '—'} (${data.nextTreatmentProvider || 'Dr. Best'})</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="doc-box">
            <p style="font-weight: bold; margin-bottom: 4px;">Medication & Exercises:</p>
            <p style="margin-bottom: 3px;"><strong>Medications:</strong> ${data.medicationTaking ? (data.medicationName || 'Taking prescribed medication') : 'None reported'}</p>
            <p><strong>Home Exercises:</strong> ${data.homeExercisesDoing ? (data.homeExercisesList || 'Performing recommended home stretches') : 'None reported'}</p>
          </div>

          <div class="doc-box">
            <p style="font-weight: bold; margin-bottom: 4px;">Other information you would like to share about your claim:</p>
            <div>${data.otherInfo || 'No additional information.'}</div>
          </div>
        </div>

        <!-- Privacy & Certification -->
        <div class="break-avoid" style="margin-top: 10px; font-size: 11px;">
          <div style="display: flex; align-items: center; margin-bottom: 4px;">
            ${renderCheckbox(data.certChecked, 'I certify that the information provided in this progress report is true and correct.')}
          </div>
          <div style="display: flex; align-items: center;">
            ${renderCheckbox(data.privacyChecked, 'I understand that the Privacy Notice applies to the personal information collected in this document.')}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="doc-bottom-footer">
        <div>Worker App ID: <strong>${data.workerAppId}</strong></div>
        <div style="text-align: right;">
          <div>Submitted: <strong>${data.submitted}</strong></div>
          <div style="font-size: 10px; color: #475569;">Page 1 of 1</div>
        </div>
      </footer>
    </div>
  `;
}

// ----------------------------------------------------
// EXERCISE 2: MEDICAL & TRAVEL EXPENSE RENDERER
// ----------------------------------------------------
function renderExercise2HTML(data, isPrint = false) {
  const scaleStyle = isPrint ? '' : `transform: scale(${state.zoomLevel / 100});`;
  return `
    <div class="wcb-document-sheet" style="${scaleStyle}">
      <div>
        <!-- 3-Column Official Top Header -->
        <header class="doc-top-header">
          <div class="doc-logo-col">
            ${WCB_LOGO_SVG}
          </div>

          <div class="doc-address-col">
            <p>333 Broadway</p>
            <p>Winnipeg, MB R3C 4W3</p>
            <p>Phone: (204) 954-4321</p>
            <p>Toll Free: 1-855-954-4321</p>
            <p><a href="https://wcb.mb.ca" target="_blank" rel="noreferrer" style="color: #005792; text-decoration: underline;">wcb.mb.ca</a></p>
          </div>

          <div class="doc-title-col">
            <h1 class="doc-main-title" style="font-size: 15px;">
              Medical & Travel Expense<br />Request
            </h1>
            <div class="claim-badge-box">
              <div class="claim-badge-num" style="border: none;">Claim No. ${data.claimNo}</div>
            </div>
          </div>
        </header>

        <!-- Intro line -->
        <p style="font-size: 13px; font-weight: 500; margin-bottom: 14px;">
          <strong>${data.workerName}</strong> requested reimbursement for the following medical and/or travel expenses:
        </p>

        <!-- 1. Prescription Drugs -->
        <div class="break-avoid" style="margin-bottom: 14px;">
          <h2 style="font-size: 13.5px; font-weight: bold; margin-bottom: 4px;">Prescription Drugs</h2>
          <table class="wcb-table">
            <thead>
              <tr>
                <th>Drug Name</th>
                <th>Prescription Date</th>
                <th>Date Purchased</th>
                <th>Healthcare Provider Name</th>
                <th style="text-align: right;">Paid Amount</th>
              </tr>
            </thead>
            <tbody>
              ${data.prescriptionDrugs.length > 0 ? data.prescriptionDrugs.map(r => `
                <tr>
                  <td><strong>${r.drugName}</strong></td>
                  <td>${r.prescriptionDate}</td>
                  <td>${r.datePurchased}</td>
                  <td>${r.providerName}</td>
                  <td style="text-align: right; font-family: monospace; font-weight: 600;">${formatMoney(r.paidAmount)}</td>
                </tr>
              `).join('') : `<tr><td colspan="5" style="text-align: center; color: #64748b; font-style: italic; padding: 8px;">No prescription drug expenses claimed.</td></tr>`}
            </tbody>
          </table>
        </div>

        <!-- 2. Over-the-Counter Drugs -->
        <div class="break-avoid" style="margin-bottom: 14px;">
          <h2 style="font-size: 13.5px; font-weight: bold; margin-bottom: 4px;">Over-the-Counter Drugs</h2>
          <table class="wcb-table">
            <thead>
              <tr>
                <th>Drug Name</th>
                <th>Date Purchased</th>
                <th>Paid Amount</th>
                <th>Seller's Name</th>
                <th>Reason for Purchasing</th>
              </tr>
            </thead>
            <tbody>
              ${data.otcDrugs.length > 0 ? data.otcDrugs.map(o => `
                <tr>
                  <td><strong>${o.drugName}</strong></td>
                  <td>${o.datePurchased}</td>
                  <td style="font-family: monospace; font-weight: 600;">${formatMoney(o.paidAmount)}</td>
                  <td>${o.sellerName}</td>
                  <td>${o.reason}</td>
                </tr>
              `).join('') : `<tr><td colspan="5" style="text-align: center; color: #64748b; font-style: italic; padding: 8px;">No over-the-counter drug expenses claimed.</td></tr>`}
            </tbody>
          </table>
        </div>

        <!-- 3. Bandages, Braces or Other Medical Supplies -->
        <div class="break-avoid" style="margin-bottom: 14px;">
          <h2 style="font-size: 13.5px; font-weight: bold; margin-bottom: 4px;">Bandages, Braces or Other Medical Supplies</h2>
          <table class="wcb-table">
            <thead>
              <tr>
                <th>Item Purchased</th>
                <th>Date Purchased</th>
                <th>Was this Prescribed?</th>
                <th>Healthcare Provider Name</th>
                <th style="text-align: right;">Paid Amount</th>
                <th>Seller's Name</th>
              </tr>
            </thead>
            <tbody>
              ${data.medicalSupplies.length > 0 ? data.medicalSupplies.map(s => `
                <tr>
                  <td><strong>${s.itemDescription}</strong></td>
                  <td>${s.datePurchased}</td>
                  <td>${s.isPrescribed ? 'Yes' : 'No'}</td>
                  <td>${s.providerName || 'N/A'}</td>
                  <td style="text-align: right; font-family: monospace; font-weight: 600;">${formatMoney(s.paidAmount)}</td>
                  <td>${s.sellerName}</td>
                </tr>
              `).join('') : `<tr><td colspan="6" style="text-align: center; color: #64748b; font-style: italic; padding: 8px;">No bandages or medical supplies claimed.</td></tr>`}
            </tbody>
          </table>
        </div>

        <!-- 4. Parking for Medical Appointments -->
        <div class="break-avoid" style="margin-bottom: 14px;">
          <h2 style="font-size: 13.5px; font-weight: bold; margin-bottom: 4px;">Parking for Medical Appointments</h2>
          <table class="wcb-table">
            <thead>
              <tr>
                <th>Address of Healthcare Provider/Medical Facility</th>
                <th>Date</th>
                <th>Paid Amount</th>
                <th>Meter Used?</th>
                <th>Meter Number</th>
              </tr>
            </thead>
            <tbody>
              ${data.parkingExpenses.length > 0 ? data.parkingExpenses.map(p => `
                <tr>
                  <td><strong>${p.facilityAddress}</strong></td>
                  <td>${p.appointmentDate}</td>
                  <td style="font-family: monospace; font-weight: 600;">${formatMoney(p.paidAmount)}</td>
                  <td>${p.meterUsed ? 'yes' : 'no'}</td>
                  <td>${p.meterNumber || 'N/A'}</td>
                </tr>
              `).join('') : `<tr><td colspan="5" style="text-align: center; color: #64748b; font-style: italic; padding: 8px;">No parking expenses claimed.</td></tr>`}
            </tbody>
          </table>
        </div>

        <!-- 5. Mileage to Medical Appointments -->
        <div class="break-avoid" style="margin-bottom: 14px;">
          <h2 style="font-size: 13.5px; font-weight: bold; margin-bottom: 2px;">Mileage to Medical Appointments</h2>
          <p style="font-size: 11px; font-style: italic; color: #475569; margin-bottom: 4px;">
            The WCB will generally reimburse only those transportation costs which are in excess of costs that would be incurred by the worker while travelling to and from work.
          </p>
          <table class="wcb-table">
            <thead>
              <tr>
                <th>Appointment Date</th>
                <th>Address of Healthcare Provider/Medical Facility</th>
                <th>Address of Workplace</th>
                <th style="text-align: right;">Number of km (Round Trip)</th>
              </tr>
            </thead>
            <tbody>
              ${data.mileageExpenses.length > 0 ? data.mileageExpenses.map(m => `
                <tr>
                  <td>${m.appointmentDate}</td>
                  <td><strong>${m.providerAddress}</strong></td>
                  <td>${m.workplaceAddress}</td>
                  <td style="text-align: right; font-family: monospace; font-weight: 600;">${m.roundTripKm} km</td>
                </tr>
              `).join('') : `<tr><td colspan="4" style="text-align: center; color: #64748b; font-style: italic; padding: 8px;">No mileage expenses claimed.</td></tr>`}
            </tbody>
          </table>
        </div>

        <!-- 6. Bus or Taxi Fare -->
        <div class="break-avoid" style="margin-bottom: 14px;">
          <h2 style="font-size: 13.5px; font-weight: bold; margin-bottom: 2px;">Bus or Taxi Fare for Medical Appointments*</h2>
          <p style="font-size: 11px; font-style: italic; color: #475569; margin-bottom: 4px;">
            *Note: Pre-approval is required from your WCB representative to claim taxi fare(s).
          </p>
          <table class="wcb-table">
            <thead>
              <tr>
                <th>Appointment Date</th>
                <th>Address of Starting Point</th>
                <th>Address of Healthcare Provider/Medical Facility</th>
                <th>Bus or Taxi (indicate one)</th>
                <th style="text-align: right;">Total Fare Paid</th>
              </tr>
            </thead>
            <tbody>
              ${data.transitExpenses.length > 0 ? data.transitExpenses.map(t => `
                <tr>
                  <td>${t.appointmentDate}</td>
                  <td>${t.startingPoint}</td>
                  <td><strong>${t.providerAddress}</strong></td>
                  <td>${t.mode}</td>
                  <td style="text-align: right; font-family: monospace; font-weight: 600;">${formatMoney(t.totalFare)}</td>
                </tr>
              `).join('') : `<tr><td colspan="5" style="text-align: center; color: #64748b; font-style: italic; padding: 8px;">No bus or taxi fare expenses claimed.</td></tr>`}
            </tbody>
          </table>
        </div>

        <!-- Privacy Notice Declaration -->
        <div class="break-avoid" style="margin-top: 10px; font-size: 11px;">
          <div style="display: flex; align-items: center;">
            ${renderCheckbox(data.privacyChecked, 'I understand that the Privacy Notice applies to the personal information collected in this document.')}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="doc-bottom-footer">
        <div>Worker App ID: <strong>${data.workerAppId}</strong></div>
        <div style="text-align: right;">
          <div>Submitted: <strong>${data.submitted}</strong></div>
          <div style="font-size: 10px; color: #475569;">Page 1 of 1</div>
        </div>
      </footer>
    </div>
  `;
}

// ----------------------------------------------------
// EXERCISE 1: LIVE INTERACTIVE FORM EDITOR
// ----------------------------------------------------
function renderExercise1Editor(data) {
  return `
    <div class="editor-card">
      <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
        <h3 style="font-size: 15px; font-weight: bold; color: #005792;">Exercise 1 Live Editor — Worker Progress Report</h3>
        <span style="font-size: 11px; background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; font-weight: 600;">Live Two-Way Sync</span>
      </div>

      <!-- Metadata -->
      <div class="editor-section">
        <div class="editor-section-title">Claim Metadata</div>
        <div class="form-row">
          <div class="form-field">
            <label>Worker Full Name</label>
            <input type="text" value="${data.workerName}" oninput="updateEx1Field('workerName', this.value)" />
          </div>
          <div class="form-field">
            <label>Claim Number</label>
            <input type="text" value="${data.claimNo}" oninput="updateEx1Field('claimNo', this.value)" />
          </div>
          <div class="form-field">
            <label>Form Code</label>
            <input type="text" value="${data.formId}" oninput="updateEx1Field('formId', this.value)" />
          </div>
          <div class="form-field">
            <label>Worker App ID</label>
            <input type="text" value="${data.workerAppId}" oninput="updateEx1Field('workerAppId', this.value)" />
          </div>
        </div>
      </div>

      <!-- Return to Work -->
      <div class="editor-section">
        <div class="editor-section-title">Return to Work Status</div>
        <div class="form-row">
          <div class="form-field">
            <label>Work Return Status</label>
            <select onchange="updateEx1Field('workStatus', this.value)">
              <option value="returned_regular" ${data.workStatus === 'returned_regular' ? 'selected' : ''}>Returned to Work (Regular)</option>
              <option value="returned_modified" ${data.workStatus === 'returned_modified' ? 'selected' : ''}>Returned to Work (Modified)</option>
              <option value="off_work" ${data.workStatus === 'off_work' ? 'selected' : ''}>I have not returned to work (Off Work)</option>
              <option value="not_missed" ${data.workStatus === 'not_missed' ? 'selected' : ''}>I have not missed time from work</option>
            </select>
          </div>
          <div class="form-field">
            <label>Return Date</label>
            <input type="text" value="${data.returnDate}" oninput="updateEx1Field('returnDate', this.value)" placeholder="e.g. March 15, 2024" />
          </div>
          <div class="form-field">
            <label>Working Mode</label>
            <select onchange="updateEx1Field('workingMode', this.value)">
              <option value="full_regular" ${data.workingMode === 'full_regular' ? 'selected' : ''}>Full duties, regular hours</option>
              <option value="full_reduced" ${data.workingMode === 'full_reduced' ? 'selected' : ''}>Full duties, reduced hours</option>
              <option value="modified_regular" ${data.workingMode === 'modified_regular' ? 'selected' : ''}>Modified duties, regular hours</option>
              <option value="modified_reduced" ${data.workingMode === 'modified_reduced' ? 'selected' : ''}>Modified duties, reduced hours</option>
            </select>
          </div>
        </div>

        <div class="form-field" style="margin-top: 10px;">
          <label>How is your return to work going?</label>
          <textarea rows="2" oninput="updateEx1Field('returnGoing', this.value)">${data.returnGoing}</textarea>
        </div>
      </div>

      <!-- Recovery & Pain -->
      <div class="editor-section">
        <div class="editor-section-title">Recovery, Pain Scale & Treatment</div>
        <div class="form-row">
          <div class="form-field">
            <label>Recovery Status</label>
            <select onchange="updateEx1Field('recoveryStatus', this.value)">
              <option value="fully_recovered" ${data.recoveryStatus === 'fully_recovered' ? 'selected' : ''}>Fully Recovered</option>
              <option value="improving" ${data.recoveryStatus === 'improving' ? 'selected' : ''}>Improving</option>
              <option value="not_fully_recovered" ${data.recoveryStatus === 'not_fully_recovered' ? 'selected' : ''}>Not Fully Recovered / Treatment Active</option>
            </select>
          </div>
          <div class="form-field">
            <label>Pain Scale Score (1 - 10)</label>
            <input type="number" min="1" max="10" value="${data.painScore}" oninput="updateEx1Field('painScore', Number(this.value))" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-field">
            <label>Last Treatment Date</label>
            <input type="text" value="${data.lastTreatmentDate}" oninput="updateEx1Field('lastTreatmentDate', this.value)" />
          </div>
          <div class="form-field">
            <label>Last Treatment Provider</label>
            <input type="text" value="${data.lastTreatmentProvider}" oninput="updateEx1Field('lastTreatmentProvider', this.value)" />
          </div>
          <div class="form-field">
            <label>Next Treatment Date</label>
            <input type="text" value="${data.nextTreatmentDate}" oninput="updateEx1Field('nextTreatmentDate', this.value)" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-field">
            <label>Medication Taking?</label>
            <select onchange="updateEx1Field('medicationTaking', this.value === 'true')">
              <option value="true" ${data.medicationTaking ? 'selected' : ''}>Yes</option>
              <option value="false" ${!data.medicationTaking ? 'selected' : ''}>No</option>
            </select>
          </div>
          <div class="form-field" style="grid-column: span 2;">
            <label>Medication Name(s)</label>
            <input type="text" value="${data.medicationName || ''}" oninput="updateEx1Field('medicationName', this.value)" placeholder="e.g. Naproxen 500mg" />
          </div>
        </div>

        <div class="form-field" style="margin-top: 10px;">
          <label>Other Information</label>
          <textarea rows="2" oninput="updateEx1Field('otherInfo', this.value)">${data.otherInfo}</textarea>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// EXERCISE 2: LIVE INTERACTIVE FORM EDITOR
// ----------------------------------------------------
function renderExercise2Editor(data) {
  return `
    <div class="editor-card">
      <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
        <h3 style="font-size: 15px; font-weight: bold; color: #005792;">Exercise 2 Live Editor — Medical & Travel Expense</h3>
        <span style="font-size: 11px; background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; font-weight: 600;">Live Item Management</span>
      </div>

      <!-- Metadata -->
      <div class="editor-section">
        <div class="editor-section-title">Claimant Details</div>
        <div class="form-row">
          <div class="form-field">
            <label>Worker Full Name</label>
            <input type="text" value="${data.workerName}" oninput="updateEx2Field('workerName', this.value)" />
          </div>
          <div class="form-field">
            <label>Claim Number</label>
            <input type="text" value="${data.claimNo}" oninput="updateEx2Field('claimNo', this.value)" />
          </div>
          <div class="form-field">
            <label>Worker App ID</label>
            <input type="text" value="${data.workerAppId}" oninput="updateEx2Field('workerAppId', this.value)" />
          </div>
        </div>
      </div>

      <!-- 1. Prescription Drugs Table Editor -->
      <div class="editor-section">
        <div class="editor-section-title">
          <span>1. Prescription Drugs (${data.prescriptionDrugs.length} Items)</span>
          <button class="btn btn-primary" onclick="addEx2Row('prescriptionDrugs')">+ Add Drug</button>
        </div>
        ${data.prescriptionDrugs.map((row, idx) => `
          <div style="display: grid; grid-template-columns: 2fr 1.5fr 1.5fr 1fr auto; gap: 8px; align-items: center; margin-bottom: 6px; background: #fff; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
            <input type="text" value="${row.drugName}" placeholder="Drug Name" oninput="updateEx2Row('prescriptionDrugs', ${idx}, 'drugName', this.value)" />
            <input type="text" value="${row.providerName}" placeholder="Doctor" oninput="updateEx2Row('prescriptionDrugs', ${idx}, 'providerName', this.value)" />
            <input type="text" value="${row.datePurchased}" placeholder="Date Purchased" oninput="updateEx2Row('prescriptionDrugs', ${idx}, 'datePurchased', this.value)" />
            <input type="number" step="0.01" value="${row.paidAmount}" placeholder="Paid ($)" oninput="updateEx2Row('prescriptionDrugs', ${idx}, 'paidAmount', parseFloat(this.value) || 0)" />
            <button class="btn btn-dark" style="color: #ef4444; padding: 4px 8px;" onclick="deleteEx2Row('prescriptionDrugs', ${idx})">✕</button>
          </div>
        `).join('')}
      </div>

      <!-- 2. Over the counter Drugs -->
      <div class="editor-section">
        <div class="editor-section-title">
          <span>2. Over-the-Counter Drugs (${data.otcDrugs.length} Items)</span>
          <button class="btn btn-primary" onclick="addEx2Row('otcDrugs')">+ Add OTC</button>
        </div>
        ${data.otcDrugs.map((row, idx) => `
          <div style="display: grid; grid-template-columns: 2fr 1.5fr 1.5fr 1fr auto; gap: 8px; align-items: center; margin-bottom: 6px; background: #fff; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
            <input type="text" value="${row.drugName}" placeholder="Drug Name" oninput="updateEx2Row('otcDrugs', ${idx}, 'drugName', this.value)" />
            <input type="text" value="${row.sellerName}" placeholder="Seller" oninput="updateEx2Row('otcDrugs', ${idx}, 'sellerName', this.value)" />
            <input type="text" value="${row.reason}" placeholder="Reason" oninput="updateEx2Row('otcDrugs', ${idx}, 'reason', this.value)" />
            <input type="number" step="0.01" value="${row.paidAmount}" placeholder="Paid ($)" oninput="updateEx2Row('otcDrugs', ${idx}, 'paidAmount', parseFloat(this.value) || 0)" />
            <button class="btn btn-dark" style="color: #ef4444; padding: 4px 8px;" onclick="deleteEx2Row('otcDrugs', ${idx})">✕</button>
          </div>
        `).join('')}
      </div>

      <!-- 3. Medical Supplies -->
      <div class="editor-section">
        <div class="editor-section-title">
          <span>3. Bandages & Medical Supplies (${data.medicalSupplies.length} Items)</span>
          <button class="btn btn-primary" onclick="addEx2Row('medicalSupplies')">+ Add Supply</button>
        </div>
        ${data.medicalSupplies.map((row, idx) => `
          <div style="display: grid; grid-template-columns: 2fr 1.5fr 1fr 1fr auto; gap: 8px; align-items: center; margin-bottom: 6px; background: #fff; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
            <input type="text" value="${row.itemDescription}" placeholder="Item Description" oninput="updateEx2Row('medicalSupplies', ${idx}, 'itemDescription', this.value)" />
            <input type="text" value="${row.sellerName}" placeholder="Seller Name" oninput="updateEx2Row('medicalSupplies', ${idx}, 'sellerName', this.value)" />
            <select onchange="updateEx2Row('medicalSupplies', ${idx}, 'isPrescribed', this.value === 'true')">
              <option value="true" ${row.isPrescribed ? 'selected' : ''}>Prescribed: Yes</option>
              <option value="false" ${!row.isPrescribed ? 'selected' : ''}>Prescribed: No</option>
            </select>
            <input type="number" step="0.01" value="${row.paidAmount}" placeholder="Paid ($)" oninput="updateEx2Row('medicalSupplies', ${idx}, 'paidAmount', parseFloat(this.value) || 0)" />
            <button class="btn btn-dark" style="color: #ef4444; padding: 4px 8px;" onclick="deleteEx2Row('medicalSupplies', ${idx})">✕</button>
          </div>
        `).join('')}
      </div>

      <!-- 4. Parking -->
      <div class="editor-section">
        <div class="editor-section-title">
          <span>4. Parking Expenses (${data.parkingExpenses.length} Items)</span>
          <button class="btn btn-primary" onclick="addEx2Row('parkingExpenses')">+ Add Parking</button>
        </div>
        ${data.parkingExpenses.map((row, idx) => `
          <div style="display: grid; grid-template-columns: 2.5fr 1.5fr 1fr auto; gap: 8px; align-items: center; margin-bottom: 6px; background: #fff; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
            <input type="text" value="${row.facilityAddress}" placeholder="Facility Address" oninput="updateEx2Row('parkingExpenses', ${idx}, 'facilityAddress', this.value)" />
            <input type="text" value="${row.appointmentDate}" placeholder="Date" oninput="updateEx2Row('parkingExpenses', ${idx}, 'appointmentDate', this.value)" />
            <input type="number" step="0.01" value="${row.paidAmount}" placeholder="Paid ($)" oninput="updateEx2Row('parkingExpenses', ${idx}, 'paidAmount', parseFloat(this.value) || 0)" />
            <button class="btn btn-dark" style="color: #ef4444; padding: 4px 8px;" onclick="deleteEx2Row('parkingExpenses', ${idx})">✕</button>
          </div>
        `).join('')}
      </div>

      <!-- 5. Mileage -->
      <div class="editor-section">
        <div class="editor-section-title">
          <span>5. Mileage Expenses (${data.mileageExpenses.length} Trips)</span>
          <button class="btn btn-primary" onclick="addEx2Row('mileageExpenses')">+ Add Mileage</button>
        </div>
        ${data.mileageExpenses.map((row, idx) => `
          <div style="display: grid; grid-template-columns: 1.5fr 2fr 2fr 1fr auto; gap: 8px; align-items: center; margin-bottom: 6px; background: #fff; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
            <input type="text" value="${row.appointmentDate}" placeholder="Date" oninput="updateEx2Row('mileageExpenses', ${idx}, 'appointmentDate', this.value)" />
            <input type="text" value="${row.providerAddress}" placeholder="Clinic Address" oninput="updateEx2Row('mileageExpenses', ${idx}, 'providerAddress', this.value)" />
            <input type="text" value="${row.workplaceAddress}" placeholder="Workplace Address" oninput="updateEx2Row('mileageExpenses', ${idx}, 'workplaceAddress', this.value)" />
            <input type="number" step="0.1" value="${row.roundTripKm}" placeholder="km" oninput="updateEx2Row('mileageExpenses', ${idx}, 'roundTripKm', parseFloat(this.value) || 0)" />
            <button class="btn btn-dark" style="color: #ef4444; padding: 4px 8px;" onclick="deleteEx2Row('mileageExpenses', ${idx})">✕</button>
          </div>
        `).join('')}
      </div>

      <!-- 6. Transit / Taxi -->
      <div class="editor-section">
        <div class="editor-section-title">
          <span>6. Bus or Taxi Fare (${data.transitExpenses.length} Trips)</span>
          <button class="btn btn-primary" onclick="addEx2Row('transitExpenses')">+ Add Transit</button>
        </div>
        ${data.transitExpenses.map((row, idx) => `
          <div style="display: grid; grid-template-columns: 1.5fr 2fr 1fr 1fr auto; gap: 8px; align-items: center; margin-bottom: 6px; background: #fff; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
            <input type="text" value="${row.appointmentDate}" placeholder="Date" oninput="updateEx2Row('transitExpenses', ${idx}, 'appointmentDate', this.value)" />
            <input type="text" value="${row.providerAddress}" placeholder="Facility Address" oninput="updateEx2Row('transitExpenses', ${idx}, 'providerAddress', this.value)" />
            <select onchange="updateEx2Row('transitExpenses', ${idx}, 'mode', this.value)">
              <option value="Bus" ${row.mode === 'Bus' ? 'selected' : ''}>Bus</option>
              <option value="Taxi" ${row.mode === 'Taxi' ? 'selected' : ''}>Taxi</option>
            </select>
            <input type="number" step="0.01" value="${row.totalFare}" placeholder="Fare ($)" oninput="updateEx2Row('transitExpenses', ${idx}, 'totalFare', parseFloat(this.value) || 0)" />
            <button class="btn btn-dark" style="color: #ef4444; padding: 4px 8px;" onclick="deleteEx2Row('transitExpenses', ${idx})">✕</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// COMPLETE PRINT & EXPORT ENGINE
// ----------------------------------------------------
function generateFullPrintableHTML() {
  const isEx1 = state.activeExercise === 'ex1';
  const currentData = isEx1 ? state.ex1Data : state.ex2Data;
  const docHtml = isEx1 ? renderExercise1HTML(currentData, true) : renderExercise2HTML(currentData, true);
  const title = isEx1 ? 'WCB Manitoba - Worker Progress Report' : 'WCB Manitoba - Medical and Travel Expense Request';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #ffffff;
      color: #000000;
      font-size: 12.5px;
      line-height: 1.35;
      padding: 24px;
    }
    .print-toolbar {
      background: #0f172a;
      color: #ffffff;
      padding: 12px 20px;
      margin: -24px -24px 24px -24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .print-btn {
      background: #005792;
      color: #ffffff;
      border: none;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
    }
    .wcb-document-sheet {
      max-width: 860px;
      margin: 0 auto;
      background: #ffffff;
      color: #000000;
    }
    .doc-top-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      border-bottom: 1px solid #000000;
      padding-bottom: 14px;
      margin-bottom: 16px;
    }
    .doc-logo-col { width: 220px; flex-shrink: 0; }
    .doc-address-col { font-size: 11px; line-height: 1.3; color: #000000; }
    .doc-title-col { text-align: right; }
    .doc-main-title { font-size: 16px; font-weight: bold; margin-bottom: 6px; line-height: 1.2; }
    .claim-badge-box { border: 2px solid #000000; display: inline-flex; font-family: monospace; font-weight: bold; font-size: 13.5px; }
    .claim-badge-num { padding: 4px 10px; border-right: 2px solid #000000; }
    .claim-badge-code { padding: 4px 8px; background: #f1f5f9; }
    .doc-box { border: 1px solid #000000; padding: 10px 12px; margin-bottom: 12px; background: #ffffff; }
    .chk-box { display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; border: 1px solid #000000; margin-right: 6px; vertical-align: middle; font-size: 10px; font-weight: bold; line-height: 1; user-select: none; }
    .chk-box.checked { background: #000000; color: #ffffff; border-color: #000000; }
    .line-input { border-bottom: 1px solid #000000; display: inline-block; min-width: 140px; text-align: center; font-weight: 600; padding: 0 4px 2px 4px; }
    table.wcb-table { width: 100%; border-collapse: collapse; font-size: 11.5px; margin-bottom: 14px; }
    table.wcb-table th, table.wcb-table td { border: 1px solid #000000; padding: 5px 8px; text-align: left; }
    table.wcb-table th { background: #ffffff; font-weight: bold; color: #000000; }
    .doc-bottom-footer { border-top: 1px solid #000000; padding-top: 10px; margin-top: 20px; display: flex; justify-content: space-between; font-size: 11px; }
    .break-avoid, .doc-box, table.wcb-table tr { break-inside: avoid; page-break-inside: avoid; }
    @media print {
      .print-toolbar { display: none !important; }
      body { padding: 0 !important; }
      @page { size: letter portrait; margin: 1.2cm 1.5cm; }
    }
  </style>
</head>
<body>
  <div class="print-toolbar">
    <div style="font-weight: bold; font-size: 14px;">WCB Manitoba — Ready to Print / Save as PDF</div>
    <div>
      <button class="print-btn" onclick="window.print()">🖨️ Click to Print / Save PDF</button>
    </div>
  </div>
  ${docHtml}
  <script>
    // Auto-trigger print on page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        try { window.print(); } catch(e) {}
      }, 350);
    });
  </script>
</body>
</html>`;
}

// 1. Direct In-Page Print Trigger
window.printDocument = function() {
  const isEx1 = state.activeExercise === 'ex1';
  const currentData = isEx1 ? state.ex1Data : state.ex2Data;
  const paperEl = document.getElementById('paperDocContainer');
  if (paperEl) {
    paperEl.innerHTML = isEx1 ? renderExercise1HTML(currentData) : renderExercise2HTML(currentData);
  }

  showToast('🖨️ Opening print dialog... (Use "↗️ Print in New Tab" if iframe blocks popup)');

  try {
    window.print();
  } catch (err) {
    console.warn('Native window.print failed, opening print window tab', err);
    window.openPrintInNewTab();
  }
};

// 2. Dedicated New-Tab Print Trigger (Bypasses iframe sandboxes)
window.openPrintInNewTab = function() {
  const fullHtml = generateFullPrintableHTML();
  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);

  const printWin = window.open(blobUrl, '_blank');
  if (!printWin) {
    const a = document.createElement('a');
    a.href = blobUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => a.remove(), 1000);
  }
  showToast('📄 Opened dedicated print tab!');
};

// 3. Download Print-Ready Standalone HTML File
window.downloadDocumentHTML = function() {
  const isEx1 = state.activeExercise === 'ex1';
  const fullHtml = generateFullPrintableHTML();
  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = isEx1 ? 'WCB_Worker_Progress_Report.html' : 'WCB_Medical_Travel_Expense_Request.html';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(blobUrl);
  }, 1000);
  showToast('💾 Downloaded document file successfully!');
};

// ----------------------------------------------------
// UI EVENT HANDLERS & STATE MUTATORS
// ----------------------------------------------------
window.switchExercise = function(ex) {
  state.activeExercise = ex;
  renderApp();
};

window.switchViewMode = function(mode) {
  state.viewMode = mode;
  renderApp();
};

window.switchPreset = function(presetKey) {
  if (state.activeExercise === 'ex1') {
    state.activePresetEx1 = presetKey;
    state.ex1Data = JSON.parse(JSON.stringify(ex1Presets[presetKey]));
    const names = { minimal: 'Dataset A: Madeleine Willson', recovery: 'Dataset B: Robert Anderson (Recovered)', complex: 'Dataset C: Elena Rostova (Complex)' };
    showToast(`Loaded ${names[presetKey] || presetKey}`);
  } else {
    state.activePresetEx2 = presetKey;
    state.ex2Data = JSON.parse(JSON.stringify(ex2Presets[presetKey]));
    const names = { single: 'Dataset 1: Single Row', stress: 'Dataset 2: Stress Test (Marcus Vance)', empty: 'Dataset 3: Empty State' };
    showToast(`Loaded ${names[presetKey] || presetKey}`);
  }
  renderApp();
};

window.changeZoom = function(delta) {
  state.zoomLevel = Math.max(50, Math.min(150, state.zoomLevel + delta));
  renderApp();
};

window.updateEx1Field = function(key, val) {
  state.ex1Data[key] = val;
  const paperEl = document.getElementById('paperDocContainer');
  if (paperEl) paperEl.innerHTML = renderExercise1HTML(state.ex1Data);
};

window.updateEx2Field = function(key, val) {
  state.ex2Data[key] = val;
  const paperEl = document.getElementById('paperDocContainer');
  if (paperEl) paperEl.innerHTML = renderExercise2HTML(state.ex2Data);
};

window.updateEx2Row = function(tableKey, idx, field, val) {
  state.ex2Data[tableKey][idx][field] = val;
  const paperEl = document.getElementById('paperDocContainer');
  if (paperEl) paperEl.innerHTML = renderExercise2HTML(state.ex2Data);
};

window.addEx2Row = function(tableKey) {
  const newItem = {
    id: String(Date.now()),
    drugName: 'New Item',
    prescriptionDate: 'March 28, 2024',
    datePurchased: 'March 28, 2024',
    providerName: 'Dr. Best',
    paidAmount: 15.00,
    sellerName: 'Shoppers Drug Mart',
    reason: 'Therapeutic Recovery',
    itemDescription: 'Medical Item',
    isPrescribed: true,
    facilityAddress: '333 St Mary Ave, Winnipeg',
    appointmentDate: 'March 28, 2024',
    meterUsed: true,
    meterNumber: 'MTR-99',
    providerAddress: 'HSC Winnipeg',
    workplaceAddress: '333 Broadway',
    roundTripKm: 15,
    startingPoint: 'Residence',
    mode: 'Bus',
    totalFare: 3.50,
  };
  state.ex2Data[tableKey].push(newItem);
  renderApp();
};

window.deleteEx2Row = function(tableKey, idx) {
  state.ex2Data[tableKey].splice(idx, 1);
  renderApp();
};

// ----------------------------------------------------
// ROOT APP RENDERER
// ----------------------------------------------------
function renderApp() {
  const root = document.getElementById('root');
  if (!root) return;

  const isEx1 = state.activeExercise === 'ex1';

  root.innerHTML = `
    <!-- Top Nav Header -->
    <header class="app-header no-print">
      <div class="header-container">
        <!-- Brand & Title -->
        <div class="brand-section">
          <div class="brand-badge">WCB MB</div>
          <div>
            <span class="brand-title">WCB Manitoba Document Suite</span>
            <span class="brand-subtitle">Pure HTML5, CSS3 & Vanilla JavaScript</span>
          </div>
        </div>

        <!-- Exercise Switcher Tabs -->
        <div class="tab-group">
          <button class="tab-btn ${isEx1 ? 'active' : ''}" onclick="switchExercise('ex1')">
            <span>📄 Exercise 1: Progress Report</span>
          </button>
          <button class="tab-btn ${!isEx1 ? 'active' : ''}" onclick="switchExercise('ex2')">
            <span>🧾 Exercise 2: Expense Request</span>
          </button>
        </div>

        <!-- View Mode Selectors & Actions -->
        <div class="controls-group">
          <div class="tab-group">
            <button class="tab-btn ${state.viewMode === 'document' ? 'active' : ''}" onclick="switchViewMode('document')">Document</button>
            <button class="tab-btn ${state.viewMode === 'split' ? 'active' : ''}" onclick="switchViewMode('split')">Split View</button>
            <button class="tab-btn ${state.viewMode === 'editor' ? 'active' : ''}" onclick="switchViewMode('editor')">Live Editor</button>
          </div>

          <!-- Print / PDF Buttons -->
          <button class="btn btn-accent" onclick="printDocument()" title="Print current document">
            <span>🖨️ Print / PDF</span>
          </button>
          <button class="btn btn-primary" onclick="openPrintInNewTab()" title="Open clean printable page in new tab">
            <span>↗️ Print in New Tab</span>
          </button>
          <button class="btn btn-dark" onclick="downloadDocumentHTML()" title="Download print-ready HTML document">
            <span>💾 Save HTML</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Workspace -->
    <main class="workspace-container">
      <!-- Toolbar & Preset Picker -->
      <div class="info-banner no-print">
        <div class="preset-picker">
          <span style="font-weight: 700; color: #f8fafc;">Active Preset:</span>
          ${isEx1 ? `
            <select class="preset-select" onchange="switchPreset(this.value)">
              <option value="minimal" ${state.activePresetEx1 === 'minimal' ? 'selected' : ''}>Dataset A: Minimal Baseline (Madeleine Willson)</option>
              <option value="recovery" ${state.activePresetEx1 === 'recovery' ? 'selected' : ''}>Dataset B: Full Recovery (Robert Anderson)</option>
              <option value="complex" ${state.activePresetEx1 === 'complex' ? 'selected' : ''}>Dataset C: Complex Case (Elena Rostova)</option>
            </select>
          ` : `
            <select class="preset-select" onchange="switchPreset(this.value)">
              <option value="single" ${state.activePresetEx2 === 'single' ? 'selected' : ''}>Dataset 1: Baseline Single Row</option>
              <option value="stress" ${state.activePresetEx2 === 'stress' ? 'selected' : ''}>Dataset 2: Stress Test (10+ Items)</option>
              <option value="empty" ${state.activePresetEx2 === 'empty' ? 'selected' : ''}>Dataset 3: Empty State</option>
            </select>
          `}
        </div>

        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 11.5px; color: #94a3b8;">Zoom: ${state.zoomLevel}%</span>
          <button class="btn btn-dark" onclick="changeZoom(-10)">-</button>
          <button class="btn btn-dark" onclick="changeZoom(10)">+</button>
        </div>
      </div>

      <!-- Dynamic Content Area based on View Mode -->
      <div id="contentArea">
        ${renderContentArea()}
      </div>
    </main>
  `;
}

function renderContentArea() {
  const isEx1 = state.activeExercise === 'ex1';
  const currentData = isEx1 ? state.ex1Data : state.ex2Data;
  const docHtml = isEx1 ? renderExercise1HTML(currentData) : renderExercise2HTML(currentData);
  const editorHtml = isEx1 ? renderExercise1Editor(currentData) : renderExercise2Editor(currentData);

  if (state.viewMode === 'document') {
    return `<div id="paperDocContainer">${docHtml}</div>`;
  } else if (state.viewMode === 'editor') {
    return `
      <div>${editorHtml}</div>
      <div id="paperDocContainer" class="hidden-screen">${docHtml}</div>
    `;
  } else if (state.viewMode === 'split') {
    return `
      <div class="split-view-grid">
        <div>${editorHtml}</div>
        <div id="paperDocContainer">${docHtml}</div>
      </div>
    `;
  }
  return `<div id="paperDocContainer">${docHtml}</div>`;
}

// Initial Boot on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
