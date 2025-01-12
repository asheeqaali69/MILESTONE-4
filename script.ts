interface ResumeData {
    [key: string]: string;
    name: string;
    email: string;
    phone: string;
    experience: string;
    skills: string;
    profilePicture: string;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("resumeForm") as HTMLFormElement;
    const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
    const profilePictureInput = document.getElementById("profile-picture") as HTMLInputElement;
    const profilePicturePreview = document.getElementById("profile-picture-preview") as HTMLDivElement;
    let profilePictureData: string = '';

    profilePictureInput.addEventListener("change", function(event: Event) {
        const target = event.target as HTMLInputElement;
        const file: File | undefined = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e: ProgressEvent<FileReader>) {
                if (e.target?.result) {
                    profilePictureData = e.target.result as string;
                    profilePicturePreview.style.backgroundImage = `url(${profilePictureData})`;
                }
            };
            reader.readAsDataURL(file);
        }
    });

    form.addEventListener("submit", function(event: Event) {
        event.preventDefault();

        if (!profilePictureData) {
            alert("Please add a profile picture before generating the resume.");
            return;
        }

        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
        const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

        generateResume({name, email, phone, experience, skills, profilePicture: profilePictureData});
    });

    function generateResume(data: ResumeData): void {
        resumeOutput.innerHTML = `
            <h2>Resume</h2>
            ${data.profilePicture ? `<img src="${data.profilePicture}" alt="Profile Picture">` : ''}
            <p><strong>Name:</strong> <span id="name-content" contenteditable="true">${data.name}</span></p>
            <p><strong>Email:</strong> <span id="email-content" contenteditable="true">${data.email}</span></p>
            <p><strong>Contact:</strong> <span id="phone-content" contenteditable="true">${data.phone}</span></p>
            <h3>Experience</h3>
            <div id="experience-content" contenteditable="true">${data.experience}</div>
            <h3>Skills</h3>
            <ul id="skills-content" contenteditable="true">${data.skills.split('\n').map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>
        `;
        resumeOutput.style.display = 'block';

       
        const editableFields = ['name', 'email', 'phone', 'experience', 'skills'];
        editableFields.forEach(field => {
            const element = document.getElementById(`${field}-content`);
            if (element) {
                element.addEventListener('input', function() {
                    if (field === 'skills') {
                        const skillItems = Array.from(this.getElementsByTagName('li'));
                        data[field] = skillItems.map(li => li.textContent?.trim() || '').join('\n');
                    } else {
                        data[field] = this.innerText.trim();
                    }
                });
            }
        });
    }
});

