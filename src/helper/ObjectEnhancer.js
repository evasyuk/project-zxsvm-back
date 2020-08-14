// // https://stackoverflow.com/questions/10539938/override-the-equivalence-comparison-in-javascript
// Object.prototype.deepEquals = function(obj)
// {
//
//     /*Make sure the object is of the same type as this*/
//     if(typeof obj != typeof this)
//         return false;
//
//     /*Iterate through the properties of this object looking for a discrepancy between this and obj*/
//     for(var property in this)
//     {
//
//         /*Return false if obj doesn't have the property or if its value doesn't match this' value*/
//         if(typeof obj[property] == "undefined")
//             return false;
//         if(obj[property] != this[property])
//             return false;
//     }
//
//     /*Object's properties are equivalent */
//     return true;
// }

String.prototype.hashCode = function()
{
    var hash = 0, i, chr;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

String.prototype.toBase64 = function()
{
    return Buffer.from(this).toString('base64')
}

String.prototype.fromBase64 = function()
{
    return Buffer.from(this, 'base64').toString('ascii')
}
