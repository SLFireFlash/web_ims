import React from 'react';
import { bubble as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

import dashboardI from '../assets/svg/dashboard.svg';
import accountI from '../assets/svg/account.svg';
import customersI from '../assets/svg/customers.svg';
import logoutI from '../assets/svg/logout.svg';
import invoiceI from '../assets/svg/invoice.svg';
import productsI from '../assets/svg/products.svg';
import suplyerI from '../assets/svg/suplyer.svg';
import analyticI from '../assets/svg/analytics.svg';

export default HamMenu => {
    const Logout =()=>{
        console.log('logout request');
        Swal.fire({
            title: "Are you sure?",
            text: "You About to Logout!!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Good Bye!",
                text: "See You Around",
                icon: "success"
              });

              axiosClient.get('/logout')
              .then(()=>{
                setUser({});
                setToken(null);              
              })
              .catch(err=>{
                console.log(err);
              })
            }
          });
        
    }
  return (
    <Menu>

    </Menu>
  );
};