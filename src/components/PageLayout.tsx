import { AuthenticatedTemplate } from '@azure/msal-react';
import Chatbox from '../apis/chatbox.tsx';
import { NavigationBar } from './NavigationBar.tsx';
import React, { useState, useEffect } from "react"; 
import HeroWithImage from '../modules/heroModule.tsx';

export const PageLayout = (props) => {
   
   return (
      <>
         <NavigationBar />
         <br />
         <h5>
               <center>Welcome to the Microsoft Authentication Library For React Tutorial</center>
         </h5>
         <HeroWithImage/>
         <br/>
         {props.children}
         <br />
         <AuthenticatedTemplate>
               <footer>
                  <Chatbox />
               </footer>
         </AuthenticatedTemplate>
      </>
   );
}

