const AuthUtils = {};

AuthUtils.checkVerifyPassword = function(password, confirmPassword){
    var result = {
        code: false,
        message: ''
    };

    if(password !== confirmPassword){
        result.code = false;
        result.message = "Password & Confirm password must be same !!";
        return result;
    }

    if(password.length < 8){
        result.code = false;
        result.message = "Password must have at least 8 characters !!";
        return result;
    }

    result.code = true;
    result.message = "Valid !!";
    return result;
};

export default AuthUtils;