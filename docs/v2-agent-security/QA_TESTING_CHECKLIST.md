# Circuit Breaker QA Testing Checklist

**Build Version:** v2.1.0  
**Status:** [ ] PASS [ ] FAIL

---

## Pre-Testing Setup

- [ ] Pull latest code from main branch
- [ ] Install dependencies: `npm install`
- [ ] Start dev server: `npm run dev`
- [ ] Clear browser cache
- [ ] Open DevTools Console (F12)
- [ ] Create test agent session with mock actions

---

## Test 1: Safe Actions - Read File ✓

**Action Type:** Read File  
**Risk Level:** LOW  

### Visual Verification
- [ ] Action card displays with green left border
- [ ] "✓ SAFE" badge visible in top-right (green background)
- [ ] Strategy label shows "LOG AND ALLOW"
- [ ] "Auto-Approve" button displays (green)
- [ ] "Kill Session" button NOT visible
- [ ] No MFA input appears

### Interaction Verification
- [ ] Click "Auto-Approve" button
- [ ] Button text changes to "Logging..."
- [ ] Console shows: `[ACTION LOG] Approved Read File`
- [ ] Action disappears from pending list

---

## Test 2: Safe Actions - Search Web ✓

**Action Type:** Search Web  
**Risk Level:** LOW  

### Verification
- [ ] Same as Test 1 (identical behavior)
- [ ] Console logs approved action

---

## Test 3: Medium Risk - Write File ⏸

**Action Type:** Write File  
**Risk Level:** MEDIUM  

### Visual Verification
- [ ] Action card displays with red left border
- [ ] "⚠ SCARY" badge visible (red background)
- [ ] Strategy label shows "PAUSE AND ASK"
- [ ] BOTH "Approve" (green) and "Kill Session" (red) visible
- [ ] No "Auto-Approve" button
- [ ] No MFA input appears

### Interaction Verification
- [ ] Click expanded details
- [ ] Technical details section appears
- [ ] Risk assessment section shows factors
- [ ] Click "Approve" button
- [ ] Action disappears from pending

---

## Test 4: High Risk - Execute Script 🛑

**Action Type:** Execute Script  
**Risk Level:** HIGH  

### Visual Verification
- [ ] Action card displays with red left border
- [ ] "⚠ SCARY" badge present
- [ ] Risk badge shows "HIGH" in orange
- [ ] Strategy label shows "HARD BLOCK AND ASK"
- [ ] "Approve" and "Kill Session" buttons visible

### Interaction Verification
- [ ] Expand details to see risk assessment
- [ ] Click "Approve"
- [ ] Action disappears from pending
- [ ] NO MFA prompt should appear

---

## Test 5: Critical Risk - Delete File 🔐

**Action Type:** Delete File  
**Risk Level:** CRITICAL  

### Visual Verification
- [ ] Action card displays with red left border
- [ ] "⚠ SCARY" badge present
- [ ] Risk badge shows "CRITICAL" in red
- [ ] Strategy label shows "HARD BLOCK REQUIRE MFA"
- [ ] "Approve" and "Kill Session" buttons visible

### MFA Input Verification
- [ ] Click "Approve" button
- [ ] Buttons disappear (hidden)
- [ ] MFA section appears below (red-tinted)
- [ ] Warning text shows: "🔐 Multi-Factor Authentication Required"
- [ ] Lock icon displays
- [ ] 6-digit input field displays
- [ ] "Verify & Approve" button displays (red, disabled)

### MFA Input Validation
- [ ] Type letters: Only numbers accepted
- [ ] Type more than 6 digits: Only first 6 kept
- [ ] Verify button disabled with 5 digits
- [ ] Verify button ENABLED with exactly 6 digits
- [ ] Input shows as monospace font

### MFA Code Entry & Verification
- [ ] Enter "000000" and click "Verify & Approve"
- [ ] Verify button shows processing state
- [ ] Alert appears: MFA code invalid
- [ ] MFA input remains visible for retry
- [ ] Enter "123456" and click "Verify & Approve"
- [ ] Action disappears from pending
- [ ] Console shows: `[ACTION LOG] Approved Delete File`

---

## Test 6: Filter & Search

- [ ] Click "All" filter: Shows all actions
- [ ] Click "Critical" filter: Shows only CRITICAL actions
- [ ] Search "Delete": Filters correctly
- [ ] Clear search: Resets filter

---

## Test 7: Risk Summary Cards

- [ ] Risk summary shows 4 cards: Critical, High, Medium, Low
- [ ] Each card displays correct count
- [ ] Cards display in correct order

---

## Test 8: Auto-Refresh Functionality

- [ ] Toggle "Auto-refresh" checkbox ON
- [ ] Pending actions refresh every 3 seconds
- [ ] Toggle OFF: No automatic refresh
- [ ] Click manual "Refresh" button: Updates immediately

---

## Test 9: Active Sessions Display

- [ ] Multiple actions from different sessions show
- [ ] Session list displays correctly
- [ ] Sessions update when actions approved/rejected
- [ ] Session disappears when last action killed

---

## Test 10: Loading States

- [ ] Component shows loading spinner on initial load
- [ ] Loading text: "Loading agent activity..."
- [ ] After data loads, spinner disappears
- [ ] During approval: Button shows "Approving..." or "Logging..."

---

## Test 11: Empty State

- [ ] When all actions cleared: Empty state appears
- [ ] Shows shield icon and text
- [ ] Reappears when first action comes in

---

## Test 12: Error Handling

- [ ] Network error during fetch: Error logged
- [ ] Approval fails (500 error): Alert shows error
- [ ] MFA verification fails (401): Alert shows MFA error
- [ ] Component remains usable after errors

---

## Test 13: Expanded Details

- [ ] Click action card to expand
- [ ] Technical details section appears with JSON
- [ ] Risk assessment section shows factors
- [ ] Click same card to collapse
- [ ] Click different card to switch view

---

## Test 14: Mobile Responsive

**Device: Mobile (390px width)**

- [ ] Action cards stack to single column
- [ ] Safe/Scary badge stays top-right
- [ ] Buttons below content
- [ ] Search input full width
- [ ] MFA input group stays horizontal
- [ ] Text sizes readable

---

## Test 15: Keyboard Navigation

- [ ] Tab through buttons in order
- [ ] Focus indicators visible
- [ ] Enter key activates button
- [ ] Spacebar activates button
- [ ] Tab navigates through MFA input

---

## Test 16: Accessibility

**Screen Reader (NVDA/JAWS/VoiceOver)**

- [ ] Button labels are descriptive
- [ ] Action type announces correctly
- [ ] Risk level announces
- [ ] MFA warning reads correctly
- [ ] Input placeholder text announced

---

## Test 17: Data Persistence

- [ ] Approve action, refresh page
- [ ] Action should NOT reappear
- [ ] Pending actions list persists correctly

---

## Test 18: Browser Compatibility

- [ ] Chrome/Chromium: All tests pass
- [ ] Firefox: All tests pass
- [ ] Safari: All tests pass
- [ ] Edge: All tests pass

---

## Test 19: Regression Tests

- [ ] Existing actions not impacted
- [ ] Old action format still works
- [ ] No breaking changes to API
- [ ] Previous features still work

---

## Sign-Off

### QA Sign-Off
- [ ] All tests passed
- [ ] No critical bugs found
- [ ] Ready for staging deployment

**QA Tester:** _______________  
**Date:** _______________  
**Notes:** _______________

---

**Status:** Ready for QA execution
