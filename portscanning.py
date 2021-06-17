# -*- coding: utf-8 -*-
"""
Created on Fri Mar 19 08:27:34 2021

@author: Annonymous
"""

import pyfiglet 
import sys 
import socket 
from datetime import datetime
from urllib3.util import url

#r = url.parse_url('http://engr\\john:@192.168.12.11:1234')

version=1.0


def banner():
    fig=pyfiglet.figlet_format("port scanning")
    print(fig)
    print('author: Jay Shah')
    print(f'version: {version}')
    print('copyright:Jay Shah')
    print('Discription:for scanning the open ports')
    print('************Happy Hunting*************')


def parse_args():
    import argparse
    parser=argparse.ArgumentParser()
    parser.add_argument('-d', '--domain',type=str,required=True,help='Target domain.' )
    parser.add_argument('-p','--ports',type=str,required=False,help="target port")
    parser.add_argument('-o', '--output',type=str,required=False,help='Output written to file.' )
    return parser.parse_args()

def write_subs_to_file(ports,output_file):
    with open(output_file,'a') as fp:
        
        fp.write(ports+'\n')
#        fp.write(banner())
        fp.close()

fre_used_ports=[20,21,22,23,25,53,80,110,111,119,123,139,143,161,194,443,445,5984,6379,8080,]

def main():
    banner()
    args=parse_args()
    g=url.parse_url(args.domain)
    ports=[]
    op=args.output
    
    print("-" * 50) 
    print("Scanning Target: " + str(g)) 
    print("Scanning started at:" + str(datetime.now())) 
    print("-" * 50) 
    
    try:
        for port in fre_used_ports:
            s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
            socket.setdefaulttimeout(0.5)
            
            result=s.connect_ex((str(g),port))
            
            if result == 0:
                ports.append(port)
                print("Port {} is open".format(port)) 
        print(pyfiglet.figlet_format("thank you"))
        s.close()
    
    except KeyboardInterrupt: 
        print("\n Exitting Program !!!!") 
        sys.exit() 
    
    except socket.gaierror: 
        print("\n Hostname Could Not Be Resolved !!!!") 
        sys.exit() 
    
    except socket.error: 
        print("\ Server not responding !!!!") 
        sys.exit() 
        
    if op is not None:
        for o in ports:
            write_subs_to_file(str(o), op)

    
if __name__=='__main__':
    main()

    