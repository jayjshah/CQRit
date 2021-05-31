# -*- coding: utf-8 -*-
"""
Created on Mon Feb  8 11:45:23 2021

@author: Annonymous
"""

import logging as log
import pyfiglet
import requests
import time
import urllib3
import sys

version=1.0

def parse_args():
    import argparse
    parser=argparse.ArgumentParser(epilog="Epilogue")
    parser.add_argument('-d', '--domain',type=str,required=True,help='Target domain.' )
    parser.add_argument('-o', '--output',type=str,required=False,help='Output written to file.' )
    parser.add_argument("-v", "--verbose", help="modify output verbosity",action = "store_true")
    return parser.parse_args()


def banner():
    fig=pyfiglet.figlet_format('subdomain scanning')
    print(fig)
    print('author: Jay Shah')
    print(f'version: {version}')
    print('copyright:Jay Shah')
    print('Discription:for finding the subdomains')
    print('************Happy Hunting*************')
    time.sleep(1)

def parse_url(url):
    try:
        host=urllib3.util.url.parse_url(url).host
    except Exception as e:
        print('[*] Invalid domain try again')
        sys.exit(1)
    return host
        
def write_subs_to_file(subdomain,output_file):
    with open(output_file,'a') as fp:
        fp.write(subdomain+'\n')
        fp.close()

    
def main():
    banner()
    subdomains=[]
    
    args=parse_args()
    target=parse_url(args.domain)
    output=args.output
    
    req=requests.get(f'https://crt.sh/?q=%.{target}&output=json')
    
    for (key,value) in enumerate(req.json()):
        subdomains.append(value['name_value'])
    print(f"\n[!] **********  TARGET: {target} ****** [!]\n")
    
    subs=sorted(set(subdomains))

    c=0
    for s in subs:
        c=c+1
        print(f'[*] {s} ',req.status_code, '\n')
        
        if output is not None:
            write_subs_to_file(s, output)
        
    print("\n\n[*]",c,"Found from",sys.argv[2])
    print('\nI hope this Will Help You to expanding your scope...................')
    print(pyfiglet.figlet_format("thank you"))
    print('************Happy Hunting*************')

    if req.status_code !=200:
        print("information not available")
        sys.exit(1)
   
  
if __name__=='__main__':
    main()
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
