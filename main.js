function toggleMenu() {
    document.getElementById('nav-menu').classList.toggle('active');
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// submit zip pdf ... this gonna be REMOOOOOVED 
document.addEventListener("DOMContentLoaded", function () {
    const fileTypeRadios = document.querySelectorAll('input[name="file-type"]');
    const fileUploadSection = document.getElementById('file-upload-section');
    const fileInput = document.getElementById('course-file');
    const uploadLabel = document.getElementById('upload-label');

    const semesterRadios = document.querySelectorAll('input[name="semester"]');
    const courseTypeSection = document.getElementById('course-type-section');

    // Show file upload when a file type is selected
    fileTypeRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            fileUploadSection.style.display = "flex";
            if (this.value === "pdf") {
                uploadLabel.innerText = "Upload PDF";
                fileInput.accept = "application/pdf";
            } else {
                uploadLabel.innerText = "Upload ZIP";
                fileInput.accept = "application/zip";
            }
        });
    });

    // Show course type selection when a semester is chosen
    semesterRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            courseTypeSection.style.display = "flex";
        });
    });

    // Handle form submission
    document.getElementById("course-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("course-name").value;
        const description = document.getElementById("course-description").value;
        const file = document.getElementById("course-file").files[0];
        const semester = document.querySelector('input[name="semester"]:checked');
        const courseType = document.querySelector('input[name="course-type"]:checked');

        if (name && description && file && semester && courseType) {
            const fileURL = URL.createObjectURL(file);

            // **Find the correct target section dynamically**
            const targetId = `${semester.value}-${courseType.value}`; // Example: "S1-Cours"
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${name}</strong>: ${description} - 
                <a href="${fileURL}" target="_blank">Download ${file.type.includes('pdf') ? 'PDF' : 'ZIP'}</a>`;
                
                targetSection.appendChild(listItem); // Add file to the correct section
            } else {
                // alert(`Error: Section "${targetId}" not found.`); later
            }

            // Reset form & hide sections after submission
            document.getElementById("course-form").reset();
            fileUploadSection.style.display = "none";
            courseTypeSection.style.display = "none";

            // showNotification(`"${file.name}" uploaded successfully!`); later
            showNotification(`Sorry Back End doesn t work for now...!`);
        }
    });
});

// *********************

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.opacity = 1;
    }, 0);
    setTimeout(() => {
        notification.style.opacity = 0;
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500);
    }, 3000);
}

// courses
document.querySelectorAll('input[name="course"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        const selectedCourse = this.value;
        const courseList = document.getElementById('course-list');
        const subCourseSection = document.getElementById('sub-course');
        
        // Show sub-course options
        subCourseSection.style.display = 'block';
        
        // Clear previous course list
        courseList.innerHTML = '';

        // Remove sub-course list when a new course is selected
        document.querySelectorAll('input[name="sub-course"]').forEach(radio => radio.checked = false);

        // Clear PDFs and set course-specific options
        const pdfs = fetchPDFs(selectedCourse);
        
        // Display the PDFs
        // pdfs.forEach(pdf => {
        //     const listItem = document.createElement('li');
        //     const pdfLink = document.createElement('a');
        //     pdfLink.href = pdf.path;
        //     pdfLink.target = "_blank";
        //     pdfLink.innerHTML = `<img class="pdf-icon" src="pdf.png" alt="PDF Icon"> ${pdf.name}`;
        //     listItem.appendChild(pdfLink);
        //     courseList.appendChild(listItem);
        // });
    });
});

// Handle sub-course selection (Cours, TD, TP)
document.querySelectorAll('input[name="sub-course"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        const selectedSubCourse = this.value;
        const selectedCourse = document.querySelector('input[name="course"]:checked').value;
        const courseList = document.getElementById('course-list');
        
        courseList.innerHTML = ''; // Clear previous course list

        // Fetch the PDFs for the selected sub-course
        const pdfs = fetchSubCoursePDFs(selectedCourse, selectedSubCourse);

        // Display the PDFs
        pdfs.forEach(pdf => {
            const listItem = document.createElement('li');
            const pdfLink = document.createElement('a');
            pdfLink.href = pdf.path;
            pdfLink.target = "_blank";
            pdfLink.innerHTML = `<img class="pdf-icon" src="icon.png" alt="PDF Icon"> ${pdf.name}`;
            listItem.appendChild(pdfLink);
            courseList.appendChild(listItem);
        });
    });
});

// Fetch PDFs for the sub-course (Cours, TD, TP)
function fetchSubCoursePDFs(course, subCourse) {
    const pdfs = [];
    const courseFolder = `courses/${course}/${subCourse}/`; 
    if (course === "S1" && subCourse === "Cours") {
        pdfs.push({ name: "S1 - Systèmes d'information et Bases de données 1", path: "https://drive.google.com/uc?export=download&id=1tpL4FSf-xbezdQyRpLij0QmtJpp-JWSz" });
        pdfs.push({ name: "S1 - Systèmes d'information et Bases de données 2", path: "https://drive.google.com/uc?export=download&id=1tpZ61EQ-MNCbnYFyRBDu4vumxOEkIqeU" });
        pdfs.push({ name: "S1 - Systèmes d'information et Bases de données 3", path: "https://drive.google.com/uc?export=download&id=1vkjc0Ml3H6uDIKDieT13GSHomd0jZ7Iu" });
        pdfs.push({ name: "S1 - Systèmes d'information et Bases de données 4", path: "https://drive.google.com/uc?export=download&id=1xGD96qLXppur3usLZivwCJYGgctpSwQ1" });
        pdfs.push({ name: "S1 - Systèmes d'information et Bases de données 5", path: "https://drive.google.com/uc?export=download&id=109zaWp8vs7ITTffSo20M3d77hmofMl0a" });
        pdfs.push({ name: "S1 - Systèmes d'information et Bases de données 6", path: "https://drive.google.com/uc?export=download&id=1284ee1ygoA2i6kLrCoY8lIpNWbOUvn1W" });
        pdfs.push({ name: "S1 - Systèmes d'information et Bases de données LDD", path: "https://drive.google.com/uc?export=download&id=14r3GlRO4OQUkDg5CJFIpD8U3rRzFAk8F" });
        pdfs.push({ name: "S1 - Systèmes d'information et Bases de données LMD", path: "https://drive.google.com/uc?export=download&id=17Jh6Pj9MJ0JUQkapsjdrrSWEtstt5xhM" });
        pdfs.push({ name: "S1 - Système d'exploitation Chapitre 1", path: "https://drive.google.com/uc?export=download&id=1Ilw2awUl2B0SUZcTofNWdMr-Jf9G3RPp" });
        pdfs.push({ name: "S1 - Système d'exploitation Chapitre 2", path: "https://drive.google.com/uc?export=download&id=1In38HWSNlyYXMB-kcsWrrFTMw9iYXhRH" });
        pdfs.push({ name: "S1 - Système d'exploitation Chapitre 3", path: "https://drive.google.com/uc?export=download&id=1IgsnjOhOmc2vOnHcbyodhBEdRzdRk0RK" });
        pdfs.push({ name: "S1 - Système d'exploitation Chapitre 4", path: "https://drive.google.com/uc?export=download&id=1IcidKnQZiwZwNNjf2yvEWptH_LZ2h3n2" });
        pdfs.push({ name: "S1 - Système d'exploitation Chapitre 5", path: "https://drive.google.com/uc?export=download&id=1IdA6eCwr4JHkZaZhh6w7KXFzoly-Fimx" });
        pdfs.push({ name: "S1 - Statistique 1", path: "https://drive.google.com/uc?export=download&id=189Xr7OAwOeD2psbztjskjD-ebSUxtlqq" });
        pdfs.push({ name: "S1 - Statistique 2", path: "https://drive.google.com/uc?export=download&id=1rw1vLjXhIaKfIjZ-F6u2ODSyLgCGKkre" });
        pdfs.push({ name: "S1 - Statistique 3", path: "https://drive.google.com/uc?export=download&id=1Hib0zerC5jxQHHtGSD5IaV90yvet401r" });
        pdfs.push({ name: "S1 - Statistique 4", path: "https://drive.google.com/uc?export=download&id=16JysdA6S6JlOL3YYUAGMeoQrWqNxy9F2" });
        pdfs.push({ name: "S1 - JAVA POO 1", path: "https://drive.google.com/uc?export=download&id=1Ew7GTj56nnNh58RnkWgD_F_6F5bQ8jdc" });
        pdfs.push({ name: "S1 - JAVA POO 2", path: "https://drive.google.com/uc?export=download&id=1v7TOPa_QkR00HidRRUPUQUgdMJJqZ-3n" });
        pdfs.push({ name: "S1 - JAVA POO 3", path: "https://drive.google.com/uc?export=download&id=1vBxjOpnKpUox0W4Czwa19ubteD8Cp8us" });
        pdfs.push({ name: "S1 - JAVA POO 4", path: "https://drive.google.com/uc?export=download&id=1xhFpiGmKTmca5gRjbqRjY1yB4wVskyDl" });
        pdfs.push({ name: "S1 - JAVA POO 5", path: "https://drive.google.com/uc?export=download&id=1y9zMc6rJtO6T_VWUpUet_49W8sOzU_Zd" });
        pdfs.push({ name: "S1 - JAVA POO 6", path: "https://drive.google.com/uc?export=download&id=1-fUUJvH_zNNJnT0MKfa6YEz2TZuE8iRY" });
        pdfs.push({ name: "S1 - JAVA POO 7", path: "https://drive.google.com/uc?export=download&id=1xi0kueUNcZkA9IXgV7LXhDk6-jIlzvjt" });
        pdfs.push({ name: "S1 - JAVA POO 8", path: "https://drive.google.com/uc?export=download&id=1-RbxWcV7VY1KlQXc-t3iGrJ0EUL3RfK6" });
        pdfs.push({ name: "S1 - Fondaments de réseaux 1", path: "https://drive.google.com/uc?export=download&id=1zNo7Xn0j5CYEVFdALY_L88lkTZNFOhyR" });
        pdfs.push({ name: "S1 - Fondaments de réseaux 2", path: "https://drive.google.com/uc?export=download&id=1Ff17KaP0jlmqSrfMuMWrVuJBttZgjwQr" });
        pdfs.push({ name: "S1 - Fondaments de réseaux 3", path: "https://drive.google.com/uc?export=download&id=1FhGyL5gFcjOOvpTxyF71freSNX564K9S" });
        pdfs.push({ name: "S1 - Fondaments de réseaux 4", path: "https://drive.google.com/uc?export=download&id=1FnZHvx2Rbz6nKosehJFBq06q78Ruobha" });
        pdfs.push({ name: "S1 - Fondaments de réseaux 5", path: "https://drive.google.com/uc?export=download&id=1G6UXStZK4-YoZZfheXpFlbPrRG3MgnuE" });
        pdfs.push({ name: "S1 - Fondaments de réseaux 6", path: "https://drive.google.com/uc?export=download&id=1G8IYh6fiKUBQs62cqZzAfgJN22DKr9CA" });
        pdfs.push({ name: "S1 - Fondaments de réseaux 7", path: "https://drive.google.com/uc?export=download&id=1Fus4mJWY72R_9_ZZY4cfkbEDI_jSGloI" });
        pdfs.push({ name: "S1 - Fondaments de réseaux 8", path: "https://drive.google.com/uc?export=download&id=1G4i55A0pGowkqbZzZsbOo3DK1pmzGyS1" });
        pdfs.push({ name: "S1 - Fondaments de réseaux 9", path: "https://drive.google.com/uc?export=download&id=1GE0wL9RQCENJfkSF1nwOpq6A-omIGfjt" });
        pdfs.push({ name: "S1 - Fondaments de réseaux 10", path: "https://drive.google.com/uc?export=download&id=1GREZIELaGMXyM8JMSkYa1_4hgzdUftgz" });
        pdfs.push({ name: "S1 - Fondaments de réseaux 11", path: "https://drive.google.com/uc?export=download&id=1GRveUOHp02Ny5PiA3Qec6M69IuIQ6Zx7" });
        pdfs.push({ name: "S1 - Fondaments de réseaux 12", path: "https://drive.google.com/uc?export=download&id=1GScfBMBRpD-hAAYqOkpF6AEa0D1g8_uv" });
        pdfs.push({ name: "S1 - Fondaments de l'IA & UML1 (1)", path: "https://drive.google.com/uc?export=download&id=18yPpBUs5xvAFvQu5blTzh8X-c3oZXmYu" });
        pdfs.push({ name: "S1 - Fondaments de l'IA & UML1 (2)", path: "https://drive.google.com/uc?export=download&id=1tSnE4m84YBP0yoHqBh5GZ_dE-TK_iVix" });
        pdfs.push({ name: "S1 - Fondaments de l'IA & UML1 (3)", path: "https://drive.google.com/uc?export=download&id=198lP-FPa7uaUHCysCKom7ILx7RJGb08Y" });
        pdfs.push({ name: "S1 - Compétences digitales 1", path: "https://drive.google.com/uc?export=download&id=1saZbr7yaAObQHUQ99mnZIz4UWLGI2fGy" });
        pdfs.push({ name: "S1 - Compétences digitales 2", path: "https://drive.google.com/uc?export=download&id=1tmxK8wjc2YVa7pjVOA5oJhs9pTkqW654" });
        pdfs.push({ name: "S1 - Compétences digitales 3", path: "https://drive.google.com/uc?export=download&id=1wGlhFbpOac5XCuJ8gjUALhTqZfUHv6ql" });
        pdfs.push({ name: "S1 - Compétences digitales 4", path: "https://drive.google.com/uc?export=download&id=1xAR-de1rv8CFDY8oMeuFb42vUbH8mTOY" });
        pdfs.push({ name: "S1 - Compétences digitales 5", path: "https://drive.google.com/uc?export=download&id=1y9bulXzxraQL2MscxtF5lw5obwSuTylG" });
        pdfs.push({ name: "S1 - Compétences digitales 6", path: "https://drive.google.com/uc?export=download&id=11rntPj0y_kkfyBZ50Q8-j1Ed6WTISBIS" });
    } else if (course === "S1" && subCourse === "TD") {
        pdfs.push({ name: "S1 TD 1 - Systèmes d'information et Bases de données", path: "https://drive.google.com/uc?export=download&id=1zvH3kUXIlamHR1x3WnwcYa8k8al2wdVy" });
        pdfs.push({ name: "S1 TD 2 - Systèmes d'information et Bases de données", path: "https://drive.google.com/uc?export=download&id=1uKCJ4XWVdFCAVMEnm0ncqzKNaKPUQuYa" });
        pdfs.push({ name: "S1 TD 3 - Systèmes d'information et Bases de données", path: "https://drive.google.com/uc?export=download&id=1-BpOBvggXZ7aVcdcxtv-__msTTji4nfL" });
        pdfs.push({ name: "S1 TD 1- Statistique", path: "https://drive.google.com/uc?export=download&id=186y2endzwKFs35JMAdq1Ge2TvP5dbCpm" });
        pdfs.push({ name: "S1 TD 2- Statistique", path: "https://drive.google.com/uc?export=download&id=18CPugKAxV5dBkNrB5B0t8HyXhYBkb5zK" });
        pdfs.push({ name: "S1 TD 3- Statistique", path: "https://drive.google.com/uc?export=download&id=1HjSwBMlO583rAz6JwOEAdIGlKd6QlrO5" });
        pdfs.push({ name: "S1 Corr TD 2- Statistique", path: "https://drive.google.com/uc?export=download&id=1FB81xiZzIgYT3S0LFGnGETOLU49iZJC2" });
        pdfs.push({ name: "S1 Corr TD - Statistique", path: "https://drive.google.com/uc?export=download&id=1F4D7JcfGMEFFufXr6zLehMxJLvvU1X0X" });
        pdfs.push({ name: "S1 - Fondaments de réseaux EXs", path: "https://drive.google.com/uc?export=download&id=1GBz1ytK0ojP5uSXfzUfj_c-KVBq4ANoG" });
        pdfs.push({ name: "S1 TD 1 UML - Fondaments de l'IA & UML1", path: "https://drive.google.com/uc?export=download&id=1Dh6x5QrE389NfqPnG1qW1SdVq6-5AWcd" });
        pdfs.push({ name: "S1 TD 2 UML - Fondaments de l'IA & UML1", path: "https://drive.google.com/uc?export=download&id=1DWMQvEwBatszzBmQPklaX7Qtv48VgtYh" });
        pdfs.push({ name: "S1 TD 3 UML - Fondaments de l'IA & UML1", path: "https://drive.google.com/uc?export=download&id=1kIfJLT2dni85IT9RMtLhHbHhSNeduJWh" });
        pdfs.push({ name: "S1 TD 1 IA  - Fondaments de l'IA & UML1", path: "https://drive.google.com/uc?export=download&id=1xydKuKsuWmwf17U0KqjY2jDZQznKrbcl" });
        pdfs.push({ name: "S1 TD 2 IA  - Fondaments de l'IA & UML1", path: "https://drive.google.com/uc?export=download&id=1xt4vz-r0BFvn3rQMYG1WOSQCnfrIGzzd" });
        pdfs.push({ name: "S1 TD 3 IA  - Fondaments de l'IA & UML1", path: "https://drive.google.com/uc?export=download&id=1xsh2nuCtCW5Nx1caYEOIa3GsifigvXIH" });
    } else if (course === "S1" && subCourse === "TP") {
        pdfs.push({ name: "S1 TP 1 - Systèmes d'information et Bases de données", path: "https://drive.google.com/uc?export=download&id=15xBsm95oJ5fm_jO4f_027B6q5BHuhfZg" });
        pdfs.push({ name: "S1 TP 2 - Systèmes d'information et Bases de données", path: "https://drive.google.com/uc?export=download&id=17Wei027WVqq94rWreQ7ycSy5lZFxaWUb" });
        pdfs.push({ name: "S1 Projet SQL - Systèmes d'information et Bases de données", path: "https://drive.google.com/uc?export=download&id=1AYoBF4Yja5T_8TB-nEIFGTD9-SsylyPW" });
        pdfs.push({ name: "S1 - Système d'exploitation Serie 1", path: "https://drive.google.com/uc?export=download&id=1xY4PlcSZ1EfmFViSRMt-mSLXYQ-4HHbU" });
        pdfs.push({ name: "S1 - Système d'exploitation Serie 2", path: "https://drive.google.com/uc?export=download&id=1-lF13kak-xlCW2jQEnYeBcPAQzoBVOaU" });
        pdfs.push({ name: "S1 TP 1 - JAVA POO", path: "https://drive.google.com/uc?export=download&id=14xyuHDU6HFqdBeFhNXfxJGcCBwJ5ATIW" });
        pdfs.push({ name: "S1 TP 2 - JAVA POO", path: "https://drive.google.com/uc?export=download&id=17TWkJoQlD9oDFX2cctd7Kz8fQrvN5HL1" });
        pdfs.push({ name: "S1 TP 3 - JAVA POO", path: "https://drive.google.com/uc?export=download&id=1nEhiHFTO-Cfh5kPA1GLyNqBrQSMz1Gas" });
        pdfs.push({ name: "S1 TP 4 - JAVA POO", path: "https://drive.google.com/uc?export=download&id=1Q1tTWLJ4LUXAtcCHC24B28LrYe6_ZRmu" });
        pdfs.push({ name: "S1 TP 1 - Fondaments de réseaux", path: "https://drive.google.com/uc?export=download&id=1w_GuCnsnfDbaPNHL9FH2qJqIUF7HtmUh" });
        pdfs.push({ name: "S1 TP 2 - Fondaments de réseaux / lab 1", path: "https://drive.google.com/uc?export=download&id=1zn9ouZk21JztAsm6T8FTzRAzVpTFGKor" });
        pdfs.push({ name: "S1 TP 2 - Fondaments de réseaux / lab 2", path: "https://drive.google.com/uc?export=download&id=1zh8aE-2tU0UbdN5AN_BB8zKwgwIdIyAn" });
        pdfs.push({ name: "S1 TP 1 - Fondaments de l'IA & UML1", path: "https://drive.google.com/uc?export=download&id=13BUCpVqGON3BYvJVlAaXLzcKBpXuqva_" });
        pdfs.push({ name: "S1 TP 2 - Fondaments de l'IA & UML1", path: "https://drive.google.com/uc?export=download&id=16is-0l-WOdteHpeQL8RxlhYFheegdRyo" });
        pdfs.push({ name: "S1 TP 1 - Compétences digitales", path: "https://drive.google.com/uc?export=download&id=1Rcaf3agS6BrooYmJPNC51NP_p0LERprq" });
        pdfs.push({ name: "S1 TP 2 - Compétences digitales", path: "https://drive.google.com/uc?export=download&id=1xHE89hK6y-SfOloQWmjHOyluXSDrT62j" });
        pdfs.push({ name: "S1 TP 3 - Compétences digitales", path: "https://drive.google.com/uc?export=download&id=1mEHx7VFt9m8K422VKfsxmEbJNxj1cWnL" });
        pdfs.push({ name: "S1 TP 4 - Compétences digitales", path: "https://drive.google.com/uc?export=download&id=1lWifEx_i5AzURtnQ601zP82gstdReKMh" });
        pdfs.push({ name: "S1 TP 5 - Compétences digitales", path: "https://drive.google.com/uc?export=download&id=1gCXu4OW12cL5jWFC8xyIgo7rTzu8wRLX" });
        pdfs.push({ name: "S1 TP 6 - Compétences digitales", path: "https://drive.google.com/uc?export=download&id=1iByDyIK_h0ambWrCKXCJmyN8eGh6S3u2" });
    }else if (course === "S2" && subCourse === "Cours") {
        pdfs.push({ name: "S3 - Technologies Web (Web & XML) 1", path: "https://drive.google.com/uc?export=download&id=1UyJV0lB93XKdpTpqNKoTQhT0VJcXnZIs" });
        pdfs.push({ name: "S3 - Technologies Web (Web & XML) 2", path: "https://drive.google.com/uc?export=download&id=1aghDKU74iA2ILd-y4qhmrpbpF5cfX-OJ" });
        pdfs.push({ name: "S3 - Technologies Web (Web & XML) 3", path: "https://drive.google.com/uc?export=download&id=1W2fB4dBYSRjXEzv3JzkCvMf2kKc9-_Nk" });
        pdfs.push({ name: "S3 - Services réseaux", path: "https://drive.google.com/uc?export=download&id=1SsMJR5VdUVkOKvyoQ-YwNXaNgNIBHSs8" });
        pdfs.push({ name: "S3 - Python", path: "https://drive.google.com/uc?export=download&id=1XTHVA2BbDvva7ceIvQ66jIjkWEgm9gRx" });
        pdfs.push({ name: "S3 - Les réseaux neurones", path: "https://drive.google.com/uc?export=download&id=1YOvIi4vpGblUYtNOpMgPzqh3n_YnE5bF" });
        pdfs.push({ name: "S3 - Cryptographie 1", path: "https://drive.google.com/uc?export=download&id=1Wg3WQgdExcUyL6UHp-G8bK_8CVId0SQd" });
        pdfs.push({ name: "S3 - Cryptographie 2", path: "https://drive.google.com/uc?export=download&id=1SIYwStPIzOxuoV-TMasY-lmKJ15LMZJC" });
        pdfs.push({ name: "S3 - Cryptographie 3", path: "https://drive.google.com/uc?export=download&id=1VFpJy-MJE0XzxSEHXRmfnC3MPu2C2ud6" });
        pdfs.push({ name: "S3 - Cryptographie 4", path: "https://drive.google.com/uc?export=download&id=1Z3AiDIodCthryMyDDKBVPFlxZIuLZlCU" });
        pdfs.push({ name: "S3 - API JAVA 1", path: "https://drive.google.com/uc?export=download&id=1TgVR5tR6Lxl4sNxGXSAiogPt-tq1z7Wc" });
        pdfs.push({ name: "S3 - API JAVA 2", path: "https://drive.google.com/uc?export=download&id=1b2jGASSDoTmxV5Ife9Ye3i8hrFKO3EOl" });
        pdfs.push({ name: "S3 - API JAVA 3", path: "https://drive.google.com/uc?export=download&id=1Rw163eDTm42Ykxg-qN9gjHXoqm2exPUm" });
        pdfs.push({ name: "S3 - API JAVA 4", path: "https://drive.google.com/uc?export=download&id=1TmBp0DiTg1uLpnD4pj1SIPm8XvsfzYAN" });
        pdfs.push({ name: "S3 - API JAVA 5", path: "https://drive.google.com/uc?export=download&id=1Tz3_Y0k11E41HbxvyxAy5F_UsfdUN_Mm" });
        pdfs.push({ name: "S3 - Administration réseau et système 1", path: "https://drive.google.com/uc?export=download&id=1_JaDw7V_roc2chXgfMF_uhNnT-fH5pQZ" });
        pdfs.push({ name: "S3 - Administration réseau et système 2", path: "https://drive.google.com/uc?export=download&id=1W9tEYECTys0-z9cWQWdtylgSpXDVqI4q" });
        pdfs.push({ name: "S3 - Administration réseau et système 3", path: "https://drive.google.com/uc?export=download&id=1_7HCXsayW0PLLDOx5HtpD06BFfBN9UyX" });
    }else if (course === "S2" && subCourse === "TD") {
        pdfs.push({ name: "S3 Exs - Cryptographie", path: "https://drive.google.com/uc?export=download&id=1ar8dKx13P9rXprRAeoyK1CbRVRCZhcod" });
        pdfs.push({ name: "S3 Mini Projet - Cryptographie", path: "https://drive.google.com/uc?export=download&id=1SIVZsbXUplvPNxLdrA1QjvjEe00YCjKd" });
    }else if (course === "S2" && subCourse === "TP") {
        pdfs.push({ name: "S3 TP 1 - Services réseaux", path: "https://drive.google.com/uc?export=download&id=1Z1H2jMkPs4leKZUFBN7B7y-6jvudWDQW" });
        pdfs.push({ name: "S3 TP 2 - Services réseaux", path: "https://drive.google.com/uc?export=download&id=1_MM-aXjj3y-fw93yAs4Bdq0JWcmC354t" });
        pdfs.push({ name: "S3 Commandes cisco - Services réseaux", path: "https://drive.google.com/uc?export=download&id=1YoqU89brGuPoX5uxcqCEMCB6lU-don3I" });
        pdfs.push({ name: "S3 TP OpenSSL 1 - Cryptographie", path: "https://drive.google.com/uc?export=download&id=1ZiP1Ka0sSCr1HlkfVkz3damg8ZWY4K2I" });
        pdfs.push({ name: "S3 TP OpenSSL 2 - Cryptographie", path: "https://drive.google.com/uc?export=download&id=1VrX9luLnYeKP1iBeizcV9l3lK0-2-7uP" });
        pdfs.push({ name: "S3 TP 1 - API JAVA", path: "https://drive.google.com/uc?export=download&id=1XqocUXnAHwMQ-dniAtNSAI6sIrDb1iiM" });
        pdfs.push({ name: "S3 TP 2 - API JAVA", path: "https://drive.google.com/uc?export=download&id=1aoG_So4C7vHSBCMEGCgUvyzyZxO0pilI" });
        pdfs.push({ name: "S3 TP 3 - API JAVA", path: "https://drive.google.com/uc?export=download&id=1anXRigwzz08z6Zxl83mE4dOjZFSp3DDl" });
    }else if (course === "S3" && subCourse === "Cours") {
        pdfs.push({ name: "S3  - Pas de cours pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S3" && subCourse === "TD") {
        pdfs.push({ name: "S3  - Pas de tds pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S3" && subCourse === "TP") {
        pdfs.push({ name: "S3  - Pas de tps pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S4" && subCourse === "Cours") {
        pdfs.push({ name: "S4  - Pas de cours pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S4" && subCourse === "TD") {
        pdfs.push({ name: "S4  - Pas de tds pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S4" && subCourse === "TP") {
        pdfs.push({ name: "S4  - Pas de tps pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S5" && subCourse === "Cours") {
        pdfs.push({ name: "S5  - Pas de cours pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S5" && subCourse === "TD") {
        pdfs.push({ name: "S5  - Pas de tds pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S5" && subCourse === "TP") {
        pdfs.push({ name: "S5  - Pas de tps pour le moment", path: `${courseFolder}lab1.pdf` });
    }
    return pdfs;
}

window.onload = function() {
    let updates = [
        "📢 Mise à jour 1 : Nouveau cours,tp ajouté en S2."
    ];

    let messageBox = document.createElement("div");
    messageBox.style.position = "fixed";
    messageBox.style.top = "10px";
    messageBox.style.left = "50%";
    messageBox.style.transform = "translateX(-50%)";
    messageBox.style.backgroundColor = "green";  
    messageBox.style.color = "white";
    messageBox.style.padding = "15px 20px";
    messageBox.style.borderRadius = "5px";
    messageBox.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.1)";
    messageBox.style.zIndex = "1000";
    messageBox.style.fontFamily = "Arial, sans-serif";
    messageBox.style.fontSize = "16px";
    messageBox.style.textAlign = "left";
    messageBox.style.width = "80%"; // Takes 90% of the screen width
    messageBox.style.maxWidth = "600px"; // Limits max width for larger screens

    let messageContent = updates.map(update => `<p style="margin: 5px 0;">${update}</p>`).join("");
    messageBox.innerHTML = messageContent;

    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.style.display = "none";
    }, 7000); // Disappears after 7 seconds
};
