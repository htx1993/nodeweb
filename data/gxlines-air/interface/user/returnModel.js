module.exports.umRreturnModel = function(isTrue, msg, data) {
    return {
        "status": (isTrue ? "success" : "failed"),
        "message": msg || "",
        "data": data || ""
    };
}