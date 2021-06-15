words='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
import sys
import argparse


args=argparse.ArgumentParser()
args.add_argument("-m", "--message", required=True,
   help="required text")
args.add_argument("-s","--shift",required=True,help="required shift value")
argu = args.parse_args()

# print(type(argu.text))
m=argu.message
s=int(argu.shift)

print(m)
print(s)

i=len(m)
print(i)

op=""


for j in range(i):
    f=m[j]
    print(f)
    loc=words.find(f)
    print(loc)
    newloc=(loc+s)%26
    op+=words[newloc]
    print(op)

print('Obfuscated version of ',m,'is ',op)

# def main():
#     print(sys.argv[1])

