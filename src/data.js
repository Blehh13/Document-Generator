/**
 * Default datasets and presets for Exercise 1 and Exercise 2.
 * Pure Vanilla JavaScript Module.
 */

export const WCB_LOGO_SVG = `
<svg viewBox="0 0 240 70" style="height: 54px; width: auto;" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g fill="#005792">
    <!-- Letter W -->
    <path d="M 0,25.5 L 6.2,0 L 13.6,0 L 17.6,16.5 L 21.6,0 L 29,0 L 35.2,25.5 L 28.5,25.5 L 25.1,9.8 L 20.8,25.5 L 14.4,25.5 L 10.1,9.8 L 6.7,25.5 Z" />
    <!-- Letter C -->
    <path d="M 57.5,6.2 C 55.2,2.1 51.4,0 45.8,0 C 37.2,0 32.2,6.4 32.2,12.8 C 32.2,19.2 37.2,25.5 45.8,25.5 C 51.4,25.5 55.2,23.4 57.5,19.3 L 51.5,16.2 C 50.3,18.5 48.3,19.6 45.8,19.6 C 41.2,19.6 38.6,16.1 38.6,12.8 C 38.6,9.5 41.2,6.0 45.8,6.0 C 48.3,6.0 50.3,7.1 51.5,9.4 Z" />
    <!-- Letter B -->
    <path d="M 61.5,0 L 72.8,0 C 77.2,0 80.2,2.3 80.2,5.7 C 80.2,8.1 78.8,10.1 76.5,11.2 C 79.6,12.4 81.5,14.8 81.5,18.3 C 81.5,22.6 77.8,25.5 72.6,25.5 L 61.5,25.5 Z M 67.8,5.6 L 67.8,10.5 L 71.8,10.5 C 73.7,10.5 74.8,9.3 74.8,8.0 C 74.8,6.7 73.7,5.6 71.8,5.6 Z M 67.8,15.0 L 67.8,20.2 L 72.2,20.2 C 74.3,20.2 75.6,18.9 75.6,17.4 C 75.6,15.9 74.3,15.0 72.2,15.0 Z" />
    <!-- Icon Figure 1 (Left human figure) -->
    <circle cx="95.5" cy="6.2" r="4.4" />
    <path d="M 87.5,25.5 C 87.5,19.8 90.0,13.8 95.5,13.8 C 98.6,13.8 101.0,15.5 102.8,18.3 L 107.5,12.2 L 111.2,14.8 L 105.2,22.8 C 102.8,25.5 99.2,25.5 96.5,25.5 Z" />
    <!-- Icon Figure 2 (Right human figure) -->
    <circle cx="115.5" cy="6.2" r="4.4" />
    <path d="M 115.5,13.8 C 119.5,13.8 123.0,17.5 123.0,25.5 L 116.5,25.5 C 116.5,21.0 114.6,19.2 112.2,19.2 C 110.3,19.2 108.9,20.5 108.0,21.8 L 103.5,16.8 L 106.8,14.2 C 109.2,13.8 112.4,13.8 115.5,13.8 Z" />
    <!-- Text Line 1 -->
    <text x="0" y="41" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="15.5" font-weight="700" letter-spacing="-0.3px">Workers Compensation</text>
    <!-- Text Line 2 -->
    <text x="0" y="57" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="15.5" font-weight="700" letter-spacing="-0.3px">Board of Manitoba</text>
  </g>
</svg>
`;

export const ex1Presets = {
  minimal: {
    workerName: 'Madeleine Willson',
    claimNo: '20042047',
    formId: 'WP',
    workerAppId: '712041',
    submitted: 'March 19, 2024 19:21',
    workStatus: 'returned_modified',
    returnDate: 'March 15, 2024',
    workingMode: 'modified_reduced',
    otherWorkText: '',
    returnGoing: 'Terrible. Testing Testing',
    expectReturnDate: '',
    concerns: '',
    contactName: '',
    contactDate: '',
    recoveryStatus: 'improving',
    recoveryComments: 'Stiffness remains in lower back.',
    painScore: 2,
    treatmentContinuing: true,
    providerType: 'Physiotherapy Clinic',
    lastTreatmentDate: 'March 12, 2024',
    lastTreatmentProvider: 'Dr. Best',
    nextTreatmentDate: 'March 26, 2024',
    nextTreatmentProvider: 'Dr. Best',
    chiroFrequency: '',
    medicationTaking: false,
    medicationName: '',
    homeExercisesDoing: false,
    homeExercisesList: '',
    otherInfo: 'No info Testing Testing',
    certChecked: true,
    privacyChecked: true,
  },
  recovery: {
    workerName: 'Robert Anderson',
    claimNo: '20054312',
    formId: 'WP',
    workerAppId: '819203',
    submitted: 'March 20, 2024 09:15',
    workStatus: 'returned_regular',
    returnDate: 'March 15, 2024',
    workingMode: 'full_regular',
    otherWorkText: 'Cleared by physician for normal full hours',
    returnGoing: 'Progressing well, full duty clearance granted without restrictions.',
    expectReturnDate: 'March 15, 2024',
    concerns: 'None, full physical capacity resumed.',
    contactName: 'Sarah Jenkins (HR Coordinator)',
    contactDate: 'March 14, 2024',
    recoveryStatus: 'fully_recovered',
    recoveryComments: 'Full pre-injury functional baseline achieved.',
    painScore: 1,
    treatmentContinuing: false,
    providerType: 'Physician (Discharged)',
    lastTreatmentDate: 'March 10, 2024',
    lastTreatmentProvider: 'Dr. Best',
    nextTreatmentDate: 'Discharged / None',
    nextTreatmentProvider: 'Dr. Best',
    chiroFrequency: 'None',
    medicationTaking: false,
    medicationName: 'None (Completed course)',
    homeExercisesDoing: true,
    homeExercisesList: 'Daily maintenance mobility and postural routine (10 mins)',
    otherInfo: 'Patient successfully concluded rehabilitation program and returned to full regular employment.',
    certChecked: true,
    privacyChecked: true,
  },
  complex: {
    workerName: 'Elena Rostova',
    claimNo: '20068994',
    formId: 'WP',
    workerAppId: '902148',
    submitted: 'March 22, 2024 14:30',
    workStatus: 'off_work',
    returnDate: '',
    workingMode: 'modified_reduced',
    otherWorkText: 'Off work - Awaiting specialist orthopedic spinal review',
    returnGoing: 'Currently off work awaiting MRI diagnostics and ergonomic clearance.',
    expectReturnDate: 'Pending Clinical Review',
    concerns: 'Severe sharp radicular lumbar discomfort upon sitting or bending > 15 mins.',
    contactName: 'David Miller (Plant Operations)',
    contactDate: 'March 18, 2024',
    recoveryStatus: 'not_fully_recovered',
    recoveryComments: 'Persistent localized pain requiring twice-weekly physiotherapy sessions.',
    painScore: 7,
    treatmentContinuing: true,
    providerType: 'Physician & Physiotherapist',
    lastTreatmentDate: 'March 14, 2024',
    lastTreatmentProvider: 'Dr. Best & Mark Henderson PT',
    nextTreatmentDate: 'March 21, 2024',
    nextTreatmentProvider: 'Mark Henderson, PT (St. Vital Clinic)',
    chiroFrequency: 'Active therapy 2x per week',
    medicationTaking: true,
    medicationName: 'Naproxen 500mg (2x daily), Cyclobenzaprine 10mg (at bedtime)',
    homeExercisesDoing: true,
    homeExercisesList: 'Pelvic stabilization, lumbar glides, gentle stretches 3x daily',
    otherInfo: 'Awaiting case manager approval for specialized workplace ergonomic assessment and MRI scan.',
    certChecked: true,
    privacyChecked: true,
  },
};

export const ex2Presets = {
  single: {
    workerName: 'Madeleine Willson',
    claimNo: '20042047',
    workerAppId: '712041',
    submitted: 'March 28, 2024 20:43',
    prescriptionDrugs: [
      { id: '1', drugName: 'Naproxen', prescriptionDate: 'February 28, 2024', datePurchased: 'February 29, 2024', providerName: 'Dr. Best', paidAmount: 20.00 },
    ],
    otcDrugs: [
      { id: '1', drugName: 'Advil', datePurchased: 'March 28, 2024', paidAmount: 8.00, sellerName: 'Shoppers Drug Mart', reason: 'Pain' },
    ],
    medicalSupplies: [
      { id: '1', itemDescription: 'Tensor', datePurchased: 'February 28, 2024', isPrescribed: true, providerName: 'Dr. Best', paidAmount: 10.00, sellerName: 'Shoppers DrugMart' },
    ],
    parkingExpenses: [
      { id: '1', facilityAddress: '333 St Mary Ave, Winnipeg MB R3C4A5, Canada', appointmentDate: 'March 28, 2024', paidAmount: 10.00, meterUsed: true, meterNumber: '12245' },
    ],
    mileageExpenses: [
      { id: '1', appointmentDate: 'March 28, 2024', providerAddress: 'HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada', workplaceAddress: 'WCB, 333 Broadway, Winnipeg MB R3C 4W3,Canada', roundTripKm: 20 },
    ],
    transitExpenses: [
      { id: '1', appointmentDate: 'March 28, 2024', startingPoint: 'Winnipeg Residence', providerAddress: 'HSC Winnipeg Women’s Hospital, 665 William Ave, Winnipeg MB R3E 0Z2, Canada', mode: 'Bus', totalFare: 3.00 },
      { id: '2', appointmentDate: 'March 27, 2024', startingPoint: '25 Furby St, Winnipeg MB R3C2A2, Canada', providerAddress: '440 Edmonton St, Winnipeg MB R3B 2M4, Canada', mode: 'Taxi', totalFare: 15.00 },
    ],
    privacyChecked: true,
  },
  stress: {
    workerName: 'Marcus Vance',
    claimNo: '20058821',
    workerAppId: '840192',
    submitted: 'March 28, 2024 20:43',
    prescriptionDrugs: [
      { id: '1', drugName: 'Naproxen 500mg (60 tabs)', prescriptionDate: 'February 28, 2024', datePurchased: 'February 29, 2024', providerName: 'Dr. Best / Shoppers #2411', paidAmount: 20.00 },
      { id: '2', drugName: 'Cyclobenzaprine 10mg (30 tabs)', prescriptionDate: 'March 02, 2024', datePurchased: 'March 03, 2024', providerName: 'Dr. Best / Rexall #612', paidAmount: 32.50 },
      { id: '3', drugName: 'Gabapentin 300mg (90 caps)', prescriptionDate: 'March 08, 2024', datePurchased: 'March 09, 2024', providerName: 'Dr. Tremblay / Rexall', paidAmount: 65.20 },
      { id: '4', drugName: 'Naproxen 500mg Refill #1', prescriptionDate: 'March 14, 2024', datePurchased: 'March 15, 2024', providerName: 'Dr. Best / Shoppers', paidAmount: 20.00 },
      { id: '5', drugName: 'Cyclobenzaprine Refill #1', prescriptionDate: 'March 18, 2024', datePurchased: 'March 19, 2024', providerName: 'Dr. Best / Shoppers', paidAmount: 32.50 },
      { id: '6', drugName: 'Tramadol/Acetaminophen 37.5/325mg', prescriptionDate: 'March 20, 2024', datePurchased: 'March 21, 2024', providerName: 'River Heights Pharmacy', paidAmount: 54.00 },
      { id: '7', drugName: 'Diclofenac Topical Gel 2.32%', prescriptionDate: 'March 22, 2024', datePurchased: 'March 23, 2024', providerName: 'River Heights Pharmacy', paidAmount: 38.90 },
      { id: '8', drugName: 'Naproxen 500mg Refill #2', prescriptionDate: 'March 24, 2024', datePurchased: 'March 25, 2024', providerName: 'Shoppers Drug Mart', paidAmount: 20.00 },
      { id: '9', drugName: 'Omeprazole 20mg', prescriptionDate: 'March 26, 2024', datePurchased: 'March 27, 2024', providerName: 'Shoppers Drug Mart', paidAmount: 28.50 },
      { id: '10', drugName: 'Lidocaine 5% Topical Patch', prescriptionDate: 'March 27, 2024', datePurchased: 'March 28, 2024', providerName: 'River Heights Pharmacy', paidAmount: 92.40 },
    ],
    otcDrugs: [
      { id: '1', drugName: 'Advil Extra Strength 400mg', datePurchased: 'March 28, 2024', paidAmount: 8.00, sellerName: 'Shoppers Drug Mart', reason: 'Pain' },
      { id: '2', drugName: 'Robaxacet Extra Strength (40 caplets)', datePurchased: 'March 04, 2024', paidAmount: 24.99, sellerName: 'Rexall Pharmacy #612', reason: 'Muscle spasm relief' },
      { id: '3', drugName: 'Tylenol Extra Strength 500mg', datePurchased: 'March 08, 2024', paidAmount: 16.49, sellerName: 'Costco Wholesale #54', reason: 'Breakthrough pain relief' },
      { id: '4', drugName: 'Biofreeze Pain Relieving Roll-On', datePurchased: 'March 12, 2024', paidAmount: 18.50, sellerName: 'St. Vital Physio Clinic', reason: 'Cryotherapy relief' },
      { id: '5', drugName: 'ThermaCare Lower Back Heat Wraps', datePurchased: 'March 16, 2024', paidAmount: 17.99, sellerName: 'Shoppers Drug Mart', reason: 'Muscle stiffness during commute' },
      { id: '6', drugName: 'Epsom Salt Therapeutic Bath Flakes', datePurchased: 'March 19, 2024', paidAmount: 14.29, sellerName: 'Costco Wholesale', reason: 'Full body muscle recovery' },
      { id: '7', drugName: 'Voltaren Emulgel Extra Strength', datePurchased: 'March 21, 2024', paidAmount: 26.99, sellerName: 'Rexall Pharmacy', reason: 'Topical back joint soreness' },
      { id: '8', drugName: 'Robax Platinum with Ibuprofen', datePurchased: 'March 23, 2024', paidAmount: 22.49, sellerName: 'Shoppers Drug Mart', reason: 'Severe lumbar tightness' },
      { id: '9', drugName: 'ThermaCare Heat Wraps Refill', datePurchased: 'March 25, 2024', paidAmount: 17.99, sellerName: 'Shoppers Drug Mart', reason: 'Commute comfort wrap' },
      { id: '10', drugName: 'Arnica Montana Recovery Salve', datePurchased: 'March 28, 2024', paidAmount: 21.00, sellerName: 'Vita Health Fresh Market', reason: 'Soft tissue bruising management' },
    ],
    medicalSupplies: [
      { id: '1', itemDescription: 'Tensor Bandage Elastic Wrap', datePurchased: 'February 28, 2024', isPrescribed: true, providerName: 'Dr. Best', paidAmount: 10.00, sellerName: 'Shoppers DrugMart' },
      { id: '2', itemDescription: 'Heavy-Duty Lumbar Support Belt', datePurchased: 'March 05, 2024', isPrescribed: true, providerName: 'Dr. Best', paidAmount: 85.00, sellerName: 'Diamond Athletic Medical Supplies' },
      { id: '3', itemDescription: 'Reusable Hot/Cold Gel Compress Pack', datePurchased: 'March 07, 2024', isPrescribed: false, providerName: 'Self', paidAmount: 24.50, sellerName: 'Diamond Athletic Medical' },
      { id: '4', itemDescription: 'Contoured Memory Foam Lumbar Roll', datePurchased: 'March 11, 2024', isPrescribed: true, providerName: 'Mark Henderson, PT', paidAmount: 36.00, sellerName: 'St. Vital Physio Clinic' },
      { id: '5', itemDescription: 'High-Density Foam Roller 36-inch', datePurchased: 'March 14, 2024', isPrescribed: true, providerName: 'Mark Henderson, PT', paidAmount: 42.00, sellerName: 'Diamond Athletic' },
      { id: '6', itemDescription: 'Kinesiology Therapeutic Tape (3 rolls)', datePurchased: 'March 17, 2024', isPrescribed: true, providerName: 'Mark Henderson, PT', paidAmount: 39.99, sellerName: 'Sport Chek Polo Park' },
      { id: '7', itemDescription: 'TENS Unit 7000 Digital Muscle Stimulator', datePurchased: 'March 20, 2024', isPrescribed: true, providerName: 'Dr. Best', paidAmount: 119.00, sellerName: 'Diamond Athletic' },
      { id: '8', itemDescription: 'TENS Replacement Electrode Pads', datePurchased: 'March 22, 2024', isPrescribed: true, providerName: 'Dr. Best', paidAmount: 29.50, sellerName: 'Diamond Athletic' },
      { id: '9', itemDescription: 'TheraBand Progressive Loop Set', datePurchased: 'March 24, 2024', isPrescribed: true, providerName: 'Mark Henderson, PT', paidAmount: 28.00, sellerName: 'St. Vital Physio' },
      { id: '10', itemDescription: 'Orthopedic Knee Wedge Pillow', datePurchased: 'March 27, 2024', isPrescribed: true, providerName: 'Dr. Best', paidAmount: 45.00, sellerName: 'Sleep Country Canada' },
    ],
    parkingExpenses: [
      { id: '1', facilityAddress: '333 St Mary Ave, Winnipeg MB R3C4A5, Canada', appointmentDate: 'March 28, 2024', paidAmount: 10.00, meterUsed: true, meterNumber: '12245' },
      { id: '2', facilityAddress: 'Health Sciences Centre, 820 Sherbrook St, Winnipeg', appointmentDate: 'March 24, 2024', paidAmount: 14.50, meterUsed: false, meterNumber: 'Underground P1' },
      { id: '3', facilityAddress: 'St. Vital Physiotherapy, 584 Pembina Hwy, Winnipeg', appointmentDate: 'March 21, 2024', paidAmount: 6.00, meterUsed: true, meterNumber: 'MTR-812' },
      { id: '4', facilityAddress: 'River Heights Medical Centre, 2025 Corydon Ave, Winnipeg', appointmentDate: 'March 18, 2024', paidAmount: 8.00, meterUsed: true, meterNumber: 'MTR-304' },
      { id: '5', facilityAddress: 'Pan Am Clinic, 75 Poseidon Bay, Winnipeg', appointmentDate: 'March 12, 2024', paidAmount: 12.00, meterUsed: false, meterNumber: 'South Lot' },
    ],
    mileageExpenses: [
      { id: '1', appointmentDate: 'March 28, 2024', providerAddress: 'HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada', workplaceAddress: 'WCB, 333 Broadway, Winnipeg MB R3C 4W3,Canada', roundTripKm: 20 },
      { id: '2', appointmentDate: 'March 24, 2024', providerAddress: 'Pan Am Clinic, 75 Poseidon Bay, Winnipeg MB', workplaceAddress: '333 Broadway, Winnipeg MB', roundTripKm: 28 },
      { id: '3', appointmentDate: 'March 21, 2024', providerAddress: 'St. Vital Physio Clinic, 584 Pembina Hwy, Winnipeg', workplaceAddress: '333 Broadway, Winnipeg MB', roundTripKm: 16 },
      { id: '4', appointmentDate: 'March 18, 2024', providerAddress: 'River Heights Medical, 2025 Corydon Ave, Winnipeg', workplaceAddress: '333 Broadway, Winnipeg MB', roundTripKm: 22 },
      { id: '5', appointmentDate: 'March 14, 2024', providerAddress: 'HSC Spine Clinic, 820 Sherbrook St, Winnipeg MB', workplaceAddress: '333 Broadway, Winnipeg MB', roundTripKm: 20 },
    ],
    transitExpenses: [
      { id: '1', appointmentDate: 'March 28, 2024', startingPoint: 'Winnipeg Residence', providerAddress: 'HSC Winnipeg Women’s Hospital, 665 William Ave, Winnipeg MB R3E 0Z2, Canada', mode: 'Bus', totalFare: 3.25 },
      { id: '2', appointmentDate: 'March 27, 2024', startingPoint: '25 Furby St, Winnipeg MB R3C2A2, Canada', providerAddress: '440 Edmonton St, Winnipeg MB R3B 2M4, Canada', mode: 'Taxi', totalFare: 15.00 },
      { id: '3', appointmentDate: 'March 22, 2024', startingPoint: 'Residence', providerAddress: 'Pan Am Clinic, 75 Poseidon Bay, Winnipeg', mode: 'Taxi', totalFare: 22.50 },
      { id: '4', appointmentDate: 'March 16, 2024', startingPoint: 'Residence', providerAddress: 'River Heights Medical Clinic', mode: 'Bus', totalFare: 3.25 },
      { id: '5', appointmentDate: 'March 10, 2024', startingPoint: 'Residence', providerAddress: 'HSC Diagnostic Imaging Centre', mode: 'Taxi', totalFare: 18.75 },
    ],
    privacyChecked: true,
  },
  empty: {
    workerName: 'New Claimant',
    claimNo: '20099999',
    workerAppId: '100001',
    submitted: 'April 01, 2024 10:00',
    prescriptionDrugs: [],
    otcDrugs: [],
    medicalSupplies: [],
    parkingExpenses: [],
    mileageExpenses: [],
    transitExpenses: [],
    privacyChecked: false,
  }
};
