document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('uploadForm');
  const submitButton = document.getElementById('submitBtn');
  
  if (uploadForm && submitButton) {  // Ensure both elements exist
    uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Disable the submit button
      submitButton.disabled = true;

      const discordUsername = document.getElementById('discordUsername').value;
      const gameName = document.getElementById('gameName').value;
      const gameLink = document.getElementById('gameLink').value;
      const gameZip = document.getElementById('gameZip').files[0];

      if (!discordUsername || !gameName || !gameLink || !gameZip) {
        alert("Please fill in all fields.");
        submitButton.disabled = false; // Re-enable the button
        return;
      }

      try {
        const formData = new FormData();
        formData.append('file', gameZip);

        const uploadResponse = await fetch('https://file.io', {
          method: 'POST',
          body: formData
        });

        const uploadData = await uploadResponse.json();

        if (uploadData.success) {
          const downloadLink = uploadData.link;

          const webhookUrl = 'https://discord.com/api/webhooks/1295097399127048262/efXXPsJLtVPFYDI7EVhpgKkteIuJxlRdFTLbUGq1Dw1UGhB-SE-T7AyZ4YZQKx_PD6yJ';
          const discordContent = `**Discord Username:** ${discordUsername}\n**Game Name:** ${gameName}\n**Game Link:** ${gameLink}\n**Download Link:** ${downloadLink}`;

          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: discordContent })
          });

          alert("Game uploaded successfully!");
          uploadForm.reset();
        } else {
          alert("Failed to upload the file. Please try again.");
        }
      } catch (error) {
        console.error('Error:', error);
        alert("Failed to upload the game.");
      } finally {
        submitButton.disabled = false;
      }
    });
  } else {
    console.error("Submit button or form element is missing.");
  }
});
