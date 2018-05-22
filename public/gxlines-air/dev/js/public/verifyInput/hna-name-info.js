function getFullName(firstName, lastName){
    var reg = /(^[a-zA-Z]+[\s\.]?([a-zA-Z]+[\s\.]?){0,4}[a-zA-Z]$)|(^[a-zA-Z]$)/;
    var fullName = "";
    if (reg.test(firstName) && reg.test(lastName)) {
        fullName = firstName + " " + lastName;
    } else {
        fullName = lastName + firstName;
    }
    return fullName;
}