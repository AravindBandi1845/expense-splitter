let groupMembers=[];
let balances={};
let categorywiseTotals = {};
function addMember(){
    let name=document.getElementById("memberName").value.trim();
    if(name==="") {
        alert("Enter a name");
        return;
    }
    groupMembers.push(name);
    balances[name]=0;
    displayMembers();
    //to clear inputfields after adding a member
    document.getElementById("memberName").value="";
}
function displayMembers(){
    let list=document.getElementById("MembersList");
    list.innerHTML="";
    let paidBySelect=document.getElementById("paidBy");
    paidBySelect.innerHTML='<option value="">Select the Payer</option>';
    for(let i=0;i<groupMembers.length;i++){
        let li=document.createElement("li");
        li.textContent=groupMembers[i];
        list.appendChild(li);

        let option=document.createElement("option");
        option.value=groupMembers[i];
        option.textContent=groupMembers[i];
        paidBySelect.appendChild(option);
    }
}
function addExpense(){
    let amount=parseFloat(document.getElementById("amount").value);
    let paidBy=document.getElementById("paidBy").value.trim();
    let customShares=document.getElementById("customShares").value.trim();

    if(isNaN(amount)|| amount<=0|| !groupMembers.includes(paidBy)){
        alert("please enter a valid amount and valid member ");
        return;
    }
    //this section is used to get description about expense,which helps us to categorize
    let description = document.getElementById("description").value.trim();
    let category = categorizeExpense(description);
    console.log(`Expense category: ${category}`); 
    //this updates total expenses sent per each category..
    update_CategoryTotal(category, amount);

    let shares=[];
    if(customShares!==""){
        shares=customShares.split(",").map(s=>parseFloat(s.trim()));
        if(shares.length!==groupMembers.length){
            alert("Number of shares should be equal to number of members");
            return;
        }
        let totalShares=shares.reduce((a,b)=>a+b,0);
        if(totalShares.toFixed(2)!=amount.toFixed(2)){
            alert("Sum of the customShares must be equal to Total Amount");
            return;
        }
    }
    // if the customshares is empty...we proceed with default equal shares
    else{
        let equalShare=amount/groupMembers.length;
        shares=Array(groupMembers.length).fill(equalShare);
    }
    for(let i=0;i<groupMembers.length;i++){
        let member=groupMembers[i];
        if(member===paidBy){
            balances[member]+=amount-shares[i];
        }
        else{
            balances[member]-=shares[i];
        }
    }
    displayBalances();
    displaySettlements();
    //to clear inputfields after adding expense
    document.getElementById("amount").value="";
    document.getElementById("paidBy").value="";
    document.getElementById("customShares").value="";
    document.getElementById("description").value="";
}
function displayBalances(){
let list=document.getElementById("BalanceList");
list.innerHTML="";
for(let member in balances){
    let li=document.createElement("li");
    if(balances[member]>0){
        li.textContent=member+" should Receive ₹"+balances[member].toFixed(2);
    }
    else if(balances[member]<0){
        li.textContent=member+" owes ₹"+Math.abs(balances[member]).toFixed(2);
    }
    else{
        li.textContent=member+" is settled";
    }
    list.appendChild(li);
    }
}
function displaySettlements(){
    let list=document.getElementById("SettlementList");
    list.innerHTML="";
    let creditors=[];
    let debtors=[];

    for(let member in balances){
        let balance=balances[member];
        if(balance>0){
            creditors.push({name:member,amount:balance});
        }
        else if(balance<0){
            debtors.push({name:member,amount:-balance});
        }
    }
    let i=0;j=0;
    while(i<debtors.length && j<creditors.length){
        let debtor=debtors[i];
        let creditor=creditors[j];
        let settleAmount=Math.min(debtor.amount,creditor.amount);
        
        let li=document.createElement("li");
        li.textContent=`${debtor.name} pays ₹${settleAmount.toFixed(2)} to ${creditor.name} `;
        list.appendChild(li);
        debtor.amount-=settleAmount;
        creditor.amount-=settleAmount;

        if(debtor.amount===0) i++;
        if(creditor.amount===0) j++;
    }
    if(list.innerHTML===""){
        let li=document.createElement("li");
        li.textContent="All Settled!";
        list.appendChild(li);
    }

}
function categorizeExpense(desc){
    desc=desc.toLowerCase();
    if(desc.includes("food")||desc.includes("restaurant")||desc.includes("meal")){
        return "Food";
    }
    else if(desc.includes("travel")||desc.includes("taxi")||desc.includes("bus")||desc.includes("flight")){
        return"Travel";
    }
    else if(desc.includes("rent")||desc.includes("house")||desc.includes("apartment")){
        return"Rent";
    }
    else if(desc.includes("shop") || desc.includes("shopping") || desc.includes("clothes") || desc.includes("mall")){
        return "Shopping";
    }
    else {
        return "Other";
    }
}
function update_CategoryTotal(category, amount){
    if(!categorywiseTotals[category]) categorywiseTotals[category] = 0;
    categorywiseTotals[category] += amount;
    displayCategory_Totals();
}
function displayCategory_Totals(){
    let list = document.getElementById("CategoryList");
    list.innerHTML = "";
    for(let cat in categorywiseTotals){
        let li = document.createElement("li");
        li.textContent = `${cat}: ₹${categorywiseTotals[cat].toFixed(2)}`;
        list.appendChild(li);
    }
}
