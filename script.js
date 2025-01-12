document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById("resumeForm");
    var resumeOutput = document.getElementById("resumeOutput");
    var profilePictureInput = document.getElementById("profile-picture");
    var profilePicturePreview = document.getElementById("profile-picture-preview");
    var profilePictureData = '';
    profilePictureInput.addEventListener("change", function (event) {
        var _a;
        var target = event.target;
        var file = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                if ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) {
                    profilePictureData = e.target.result;
                    profilePicturePreview.style.backgroundImage = "url(".concat(profilePictureData, ")");
                }
            };
            reader.readAsDataURL(file);
        }
    });
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!profilePictureData) {
            alert("Please add a profile picture before generating the resume.");
            return;
        }
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var experience = document.getElementById("experience").value;
        var skills = document.getElementById("skills").value;
        generateResume({ name: name, email: email, phone: phone, experience: experience, skills: skills, profilePicture: profilePictureData });
    });
    function generateResume(data) {
        resumeOutput.innerHTML = "\n            <h2>Resume</h2>\n            ".concat(data.profilePicture ? "<img src=\"".concat(data.profilePicture, "\" alt=\"Profile Picture\">") : '', "\n            <p><strong>Name:</strong> <span id=\"name-content\" contenteditable=\"true\">").concat(data.name, "</span></p>\n            <p><strong>Email:</strong> <span id=\"email-content\" contenteditable=\"true\">").concat(data.email, "</span></p>\n            <p><strong>Contact:</strong> <span id=\"phone-content\" contenteditable=\"true\">").concat(data.phone, "</span></p>\n            <h3>Experience</h3>\n            <div id=\"experience-content\" contenteditable=\"true\">").concat(data.experience, "</div>\n            <h3>Skills</h3>\n            <ul id=\"skills-content\" contenteditable=\"true\">").concat(data.skills.split('\n').map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "</ul>\n        ");
        resumeOutput.style.display = 'block';
        // Add event listeners for all editable content
        var editableFields = ['name', 'email', 'phone', 'experience', 'skills'];
        editableFields.forEach(function (field) {
            var element = document.getElementById("".concat(field, "-content"));
            if (element) {
                element.addEventListener('input', function () {
                    if (field === 'skills') {
                        var skillItems = Array.from(this.getElementsByTagName('li'));
                        data[field] = skillItems.map(function (li) { var _a; return ((_a = li.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ''; }).join('\n');
                    }
                    else {
                        data[field] = this.innerText.trim();
                    }
                });
            }
        });
    }
});
