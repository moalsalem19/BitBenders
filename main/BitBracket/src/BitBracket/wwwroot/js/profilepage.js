document.addEventListener('DOMContentLoaded', function () {
    const showBlockedButton = document.getElementById('show-blocked-users');
    PopulateBlockedUsers();
    showBlockedButton.addEventListener('click', () => ShowBlockedUsers());
    CalculateEstimatedSkillLevel();
});

function CalculateEstimatedSkillLevel() { 
    fetch('/api/BitUserApi/GetEstimatedSkillLevel')
    .then(response => response.json())
    .then(data => {
        const skillLevelElement = document.getElementById('estimated-skill-level');
        levelData = CleanData(data);
        skillLevelElement.textContent = levelData;
        skillLevelElement.classList.add('skill-level-bar');
        skillLevelElement.style.backgroundColor = getSkillLevelColor(data);

    });
}

function CleanData(data) {
    if (data === 1) {
        data = 'Amatuer: Level 1';
    }
    else if (data === 2) {
        data = 'Beginner: Level 2';
    }
    else if (data === 3) {
        data = 'Novice: Level 3';
    }
    else if (data === 4) {
        data = 'Intermediate: Level 4';
    }
    else if (data === 5) {
        data = 'Skilled: Level 5';
    }
    else if (data === 6) {
        data = 'Advanced: Level 6';
    }
    else if (data === 7) {
        data = 'Expert: Level 7';
    }
    else if (data === 8) {
        data = 'Master: Level 8';
    }
    else {
        data = 'Play in tournaments to get an estimated skill level';
    }
    return data;
}

function getSkillLevelColor(level) {
    switch (level) {
        case 1:
            return 'red';
        case 2:
            return 'orange';
        case 3:
            return 'yellow';
        case 4:
            return 'green';
        case 5:
            return 'blue';
        case 6:
            return 'indigo';
        case 7:
            return 'violet';
        case 8:
            return 'purple';
        default:
            return 'gray';
    }
}
function PopulateBlockedUsers() {
    const blockedUsersContainer = document.getElementById('blocked-users-list');
    blockedUsersContainer.innerHTML = ''; // Clear previous entries

    fetch('/api/BitUserApi/GetBlockedUsers')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                console.log(user.blockedUserNavigation.username);
                const node = document.createElement('div');
                node.innerHTML = `
                    <p class='header'>${user.blockedUserNavigation.username}
                        <button class='ui small primary button'>Unblock</button>
                    </p>
                    `;
                const button = node.querySelector('button');
                button.addEventListener('click', () => UnblockUser(user.blockedUserNavigation.username));
                
                blockedUsersContainer.appendChild(node);
            });
        });
}

function UnblockUser(name) {
fetch(`/api/BitUserApi/UnblockUser/${name}`, {
        method: 'PUT',
    })
        .then(response => {
            if (response.ok) {
                alert('User unblocked successfully!');
                location.reload();
            } else {
                alert('Failed to unblock user.');
            }
        });
}
function ShowBlockedUsers() {
    const blockedUsersContainer = document.getElementById('show-blocked-container');
    if (blockedUsersContainer.style.display === 'block') {
        blockedUsersContainer.style.display = 'none';
        return;
    }
    else {
        blockedUsersContainer.style.display = 'block';
        const showBlockedButton = document.getElementById('show-blocked-users');
        showBlockedButton.textContent = 'Hide Blocked Users';

    }
    
}



// Enable editing of the div content for Tag and Bio
document.getElementById('tagId').contentEditable = true;
document.getElementById('bioId').contentEditable = true;

// Function to update profile picture
document.getElementById('profileImage').addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/BitUserApi/Image', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                // Reload the page to update the profile picture
                location.reload();
            } else {
                alert('Error uploading file.');
            }
        } catch (error) {
            alert('Error: ' + error);
        }
    };

    input.click();
});

// Functionality to save Tag and Bio
document.getElementById('saveTagButtonId').addEventListener('click', async function () {
    const updatedTag = document.getElementById('tagId').innerText;
    await updateUserInfo('tag', updatedTag);
});

document.getElementById('saveBioButtonId').addEventListener('click', async function () {
    const updatedBio = document.getElementById('bioId').innerText;
    await updateUserInfo('bio', updatedBio);
});

// Generic function to update user info (Tag or Bio)
async function updateUserInfo(field, value) {
    const url = `/api/BitUserApi/${field}Change/${value}`;
    try {
        const response = await fetch(url, { method: 'PUT' });
        if (response.ok) {
            alert(`${field} updated successfully.`);
            location.reload(); // Optionally reload if you want immediate visual feedback
        } else {
            alert(`Failed to update ${field}.`);
        }
    } catch (error) {
        alert(`Error updating ${field}: ${error}`);
    }
}
