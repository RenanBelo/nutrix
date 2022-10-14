import React, { useState } from 'react';

import {View, TextInput, Text, TouchableOpacity, Image, Button, Alert} from 'react-native';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";


import style from './styles';

import ImageLogo from '../../assets/orangefinal.png';


import { auth} from "../../service/firebaseConnection";


import { db} from "../../service/firebaseConnection";

export default function Login(props) {

    const[email,setEmail]= useState("");
    const[password,setPassword]=useState("");


   async function handleNewAccount(){
        
     await   createUserWithEmailAndPassword(auth, email,password)
       .then(value=> {
            setDoc(doc(db, "Usuarios", value.user.uid), {
            
              email: email
                        })
       console.log('cadastro bem sucedido + \n' + value.user.uid);
       })
       .catch((error) => console.log(error));
      

    };
  return (
    <View style={style.container}>
      <Image style={style.imagem} source={ImageLogo} />

      <View style={style.content}>
        <TextInput placeholder="E-mail"  onChangeText={(value) => setEmail(value)} style={style.input}  />

        <TextInput placeholder="Senha" onChangeText={(value) => setPassword(value)} secureTextEntry style={style.input} />
</View>
        <Button title='Cadastrar'  onPress={() => handleNewAccount( email, password)}  style={style.button}>
        
        </Button>
        <Text style ={style.texto}>Não tem uma conta? <Text style={style.text} onPress={()=>props.navigation.navigate('Cadastro')}>Clique aqui para se cadastrar </Text> </Text>
      </View>
   
  );
};