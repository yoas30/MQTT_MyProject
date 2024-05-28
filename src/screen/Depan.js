import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, Alert } from 'react-native'
import { useState, useEffect, React } from "react";
import Paho from "paho-mqtt";

const logoImg = require ('../.././img/della.png');



const bodyText = 'LOADING...';

client = new Paho.Client(
  "broker.mqtt-dashboard.com",
  Number(8000),
  `mqtt-async-test-${parseInt(Math.random() * 100)}` //ok
);

const DashboardDepan = () => {

  const [value, setValue] = useState(0); //ok
  const [text, setText] = useState('');
  const fontFamily1 = Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto';
  


  function onMessage(message) {
    if (message.destinationName === "yoas1995/data")
        setValue(parseInt(message.payloadString));
  }

  ////////////////////////////////////////////////
  useEffect(() => {
    client.connect( {
      onSuccess: () => { 
      setText('TERKONEKSI !!');
      console.log("Connected!!");
      client.subscribe("yoas1995/data");
      client.onMessageArrived = onMessage;
    },
    onFailure: () => {
      setText('TIDAK TERKONEKSI !!');
      console.log("Failed to Connect!"); 
    }
  });
  }, [])
////////////////////////////////////////////////// PERINTAH //////


function pompaHidup(c) {
  //const message = new Paho.Message((value + 1).toString());
  const message = new Paho.Message("relay1_on");
  // message.destinationName = "yoas30/relays";
  message.destinationName = "yoas30/relays";
  c.send(message);
  Alert.alert('Menghidupkan Pompa Air',  'Perintah terkirim!!');
}

function pompaMati(c) {
  //const message = new Paho.Message((value + 1).toString());
  const message = new Paho.Message("relay1_off");
  message.destinationName = "yoas30/relays";
  c.send(message);
  Alert.alert('Mematikan Pompa Air',  'Perintah terkirim!!');
}


///////////////////////////////////////////////// PERINTAH ///////
  return (
    <View style={styles.container1}>
      {/* <Ionicons name={"logo-android"} size = {120} color = {"#FFFFFF"}/> */}
      <Image source={logoImg} style={{ width: 200, height: 200 }}/>
      <Text style={{ 
          fontSize : 30,
          color : "#FFFFFF",
          fontWeight : 700,
          marginTop : 40,
          fontFamily1
       }}
      > KELUARGA CANTIK DAN GANTENG </Text>
      <Text style={{ 
          fontSize : 20,
          color : "#FFFFFF",
          fontWeight : 500,
          marginTop : 10
       }}
      >== Hidupkan Pompa Air ==</Text>

       <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                <TouchableOpacity onPress={() => { pompaHidup(client);} }
                  style={{ 
                    backgroundColor: "#1abc9c",
                    width: "30%",
                    padding: 15,
                    borderRadius: 10,
                    marginVertical: 20,
                    marginHorizontal: 10,
                  }}>
                    <Text style={{ 
                          color: "white",
                          fontSize: 20,
                          fontWeight: "500",
                          textAlign: "center",
                          textAlignVertical: "center",
                    }}>Klik ON</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { pompaMati(client);} }
                  style={{ 
                    backgroundColor: "#af1313",
                    width: "30%",
                    padding: 15,
                    borderRadius: 10,
                    marginVertical: 20,
                    marginHorizontal: 10,
                  }}>
                    <Text style={{ 
                          color: "white",
                          fontSize: 20,
                          fontWeight: "500",
                          textAlign: "center"
                    }}>Klik OFF</Text>
                </TouchableOpacity>         
      </View>

          <Text style={{ 
              fontSize : 15,
              color : "#FFFFFF",
              fontWeight : 500,
              marginTop : 30
          }}>
            {text}
          </Text>

    </View>
  )
}

export default DashboardDepan;

const styles = StyleSheet.create({
  container1: {
    flex:1,
     backgroundColor:"#2c3e50",
    justifyContent: "center",
    alignItems:"center",
  }
})
