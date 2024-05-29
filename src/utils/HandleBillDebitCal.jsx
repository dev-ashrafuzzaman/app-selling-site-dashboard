

export const HandleBillDebitCal = (data) => {
    const { duty, india, lc, misc, text1, text2 } = data;
    const Total = duty.de_duty_tk + india.de_india_tk + lc.de_lc_tk + misc.de_misc_tk + text1.de_any1_tk + text2.de_any2_tk;
    return Total;
}

export const HandleBillCreditCal = (data) => {
    const { credit1, credit2, credit3, credit4, credit5, credit6, credit7, credit8 } = data;
    const Total = credit1.cr_tk1 + credit2.cr_tk2 + credit3.cr_tk3 + credit4.cr_tk4 + credit5.cr_tk5 + credit6.cr_tk6 + credit7.cr_tk7 + credit8.cr_tk8
    return Total;
}


export const HandleEachBillTotalDue = (allBills, eachBillDebit, eachBillCredit) => {
    // Find the index of the current bill in the array
    const currentIndex = allBills.findIndex(bill => bill.debit === eachBillDebit && bill.credit === eachBillCredit);
  
    // Calculate total due for the current bill and all previous bills
    const totalDue = allBills
      .slice(currentIndex)  // Updated to start from currentIndex
      .reduce((sum, bill) => sum + (bill.debit - bill.credit), 0);
  
    return totalDue;
  };


  export const HandleSingleBillTotalDue = (allBills, selectedBillNo) => {
    // Find the index of the selected bill in the array
    const selectedIndex = allBills.findIndex(bill => bill.bill_no === selectedBillNo);
  
    // Calculate total due for all subsequent bills, excluding the selected bill
    const totalDue = allBills
      .slice(selectedIndex + 1)  // Exclude the selected bill
      .reduce((sum, bill) => sum + (bill.debit - bill.credit), 0);
  
    return totalDue;
  };


  export const calculateTotalCredit = (billingArray) => {
    let totalCredit = 0;

    if (billingArray && Array.isArray(billingArray)) {
        billingArray.forEach(account => {
            if (account && account.credit) {
                totalCredit += account.credit;
            }
        });
    }

    return totalCredit;
  }
  
  export const calculateTotalDebit = (billingArray) => {
    let totaldebit = 0;

    if (billingArray && Array.isArray(billingArray)) {
        billingArray.forEach(account => {
            if (account && account.debit) {
                totaldebit += account.debit;
            }
        });
    }

    return totaldebit;
  }