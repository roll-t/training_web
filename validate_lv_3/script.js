const listInput = document.querySelectorAll(".group-input input")

// lưu ý: phần key của object pải giống name của input
const boxMessError = {
    userName: {
        empty: "không được để trống !!",
        lengthMax: `Tên đăng nhập quá dài !!`,
        lengthMin: `Tên đăng nhập qúa ngắn !!`,
    },
    phone: {
        empty: "không được để trống !!",
        format: "Sai định dạng số điện thoại !!",
    },
    email: {
        empty: "không được để trống !!",
        format: "Sai định dạng email !!",
    },
    password: {
        empty: "không được để trống !!",
        lengthMax: `Mật khẩu quá dài !!`,
        lengthMin: `Mật khẩu quá ngắn !!`,
    },
    passwordConfirm: {
        empty: "không được để trống !!",
        match: `Mật khẩu không trùng khớp !!`,
    },
    default: "Không có thông báo ??",
    getMess: function (key, type) {
        return this[key][type] || this.default; // Trả về giá trị tương ứng hoặc giá trị mặc định
    }
}

const regex = {
    regexCode: {
        mail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/
    },
    phone: (value) => regex.regexCode.phone.test(value),
    mail: (value) => regex.regexCode.mail.test(value)
}


function showError(input, mess) {
    const boxError = input.parentElement.querySelector(".error-effect")
    if (boxError) {
        const textError = boxError.querySelector(".error-mess")
        const lineError = boxError.querySelector(".bottom-line")
        textError.innerHTML = mess
        lineError.classList.add("active")
    }
}

function showSuccess(input) {
    const boxError = input.parentElement.querySelector(".error-effect")
    if (boxError) {
        const textError = boxError.querySelector(".error-mess")
        const lineError = boxError.querySelector(".bottom-line")
        textError.innerHTML = ''
        lineError.classList.remove("active")
    }
}

function checkMail(input) {
    if (!regex.mail(input.value.trim())) {
        showError(input, boxMessError.getMess(input.name, "format"))
    } else {
        showSuccess(input)
        return true
    }
    return false
}


function checkPhone(input) {
    if (!regex.phone(input.value.trim())) {
        showError(input, boxMessError.getMess(input.name, "format"))
    } else {
        showSuccess(input)
        return true
    }
    return false
}

function checkLength(input, min, max) {
    if (input.value.trim().length == 0) {
        showError(input, boxMessError.getMess(input.name, "empty"))
    } else if (input.value.trim().length < min) {
        showError(input, boxMessError.getMess(input.name, "lengthMin"))
    } else if (input.value.trim().length > max) {
        showError(input, boxMessError.getMess(input.name, "lengthMax"))
    } else {
        showSuccess(input)
        return true
    }
    return false
}

function matchPassword(password, passwordConfirm) {
    if (password.value.trim() != passwordConfirm.value.trim()) {
        showError(passwordConfirm, boxMessError.getMess(passwordConfirm.name, "match"))
    } else {
        showSuccess(passwordConfirm)
        return true
    }
    return false
}

// __ main__ handle
// event validate input
const validate = {
    userName: false,
    mail: false,
    phone: false,
    password:false,
    passwordConfirm: false
}

const check = (listCheck) => {
    return Object.values(listCheck).filter(items => items == false).length == 0
}



function handleInput() {
    listInput.forEach((input, index) => {
        switch (input.name) {
            case 'userName':
                validate.userName = checkLength(input,3,25)
                break;
            case 'phone':
                validate.phone = checkPhone(input)
                break;
            case 'email':
                validate.mail = checkMail(input)
                break;
            case 'password':
                validate.password = checkLength(input,3,12)
                break;
            case 'passwordConfirm':
                validate.passwordConfirm = matchPassword(listInput[index - 1], input) && checkLength(input,0,1000)
                break;
            default:
                break;
        }
    })
}


listInput.forEach((input, index) => {
    input.addEventListener("input", e => {
        if (e.keyCode != 32) {
            switch (input.name) {
                case 'userName':
                    validate.userName = checkLength(input,3,25)
                    break;
                case 'phone':
                    validate.phone = checkPhone(input)
                    break;
                case 'email':
                    validate.mail = checkMail(input)
                    break;
                case 'password':
                    validate.password = checkLength(input,3,12)
                    break;
                case 'passwordConfirm':
                    validate.passwordConfirm = matchPassword(listInput[index - 1], input) && checkLength(input,0,1000)
                    break;
                default:
                    break;
            }
        }
    })
})


// event confirm register
const btn = document.querySelector(".submit");
btn.addEventListener("click", (e) => {
    !check(validate) && e.preventDefault();
    handleInput()
    if (check(validate)) {
        alert("dang nhap thanh cong")
    }
});