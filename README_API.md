# Template API Tutorial

This is a simple template to show how to implement **myNanoPHP** C library in your PHP Backend

In development

## Installing

## Apache2

## Template file

All API method in this template file: **POST**

Form is _encoded URL_ (form url encoded)

### COMMAND: add

- Description:

Adds two Nano big numbers RES = A + B

command|type|required
-------|----|-------|
add|command|yes
valuea|A value|yes
valueb|B value|yes
typea|Big number A type|Optional (see table below)
typeb|Big number B type|Optional (see table below)
typer|Big number _Result_ type|Optional. If ommited Real (_real_) type is used (see table below)

Value type|Description
----------|-----------
real|Real big number type is parsed/result
raw|Raw big number type is parsed/result
hex|Hex big number type is parsed/result

**Example 1**

Add A = 18277.1992773(Real) + B = 122763.18038177 = ?

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=add \
  --data valuea=18277.1992773 \
  --data valueb=122763.18038177 \
  --data typer=hex
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "value_a": "18277.1992773",
  "value_b": "122763.18038177",
  "result": "001b29d3dd7919e228f13717cac00000"
}
```

**Example 2**

Add A = 15.1 (Real) + B = 1.2(Real) = ?

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=add \
  --data valueb=1.2 \
  --data valuea=15.1 
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "value_a": "15.1",
  "value_b": "1.2",
  "result": "16.3"
}
```

### COMMAND: bip39_2_key_pair

:warning: WARNING: Sensible data -> Bip39 and private key.

- Description:

Extracts Private key, public key and Nano Base32 encoded string wallet from Bip39.

command|type|required
-------|----|-------|
bip39_2_key_pair|command|yes
bip39|Bip39 world list|yes
wallet_number|Wallet number|yes
prefix|Nano prefix|Optional. If ommited _nano__ prefix is used (See table below)

Value type|Description
----------|-----------
nano_ |Nano prefix
xrb_ |Xrb prefix

**Example**

Extract key pair number 159 from word list **moral history analyst regular resemble belt exercise motor hungry pizza purity convince narrow ancient arrange hard affair cloth pigeon board grain all story kite** with prefix **xrb_**

```sh
curl --request POST \
  --url 'http://localhost/template.php?=' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'bip39=moral history analyst regular resemble belt exercise motor hungry pizza purity convince narrow ancient arrange hard affair cloth pigeon board grain all story kite' \
  --data command=bip39_2_key_pair \
  --data wallet_number=159 \
  --data prefix=xrb_
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "key_pair": {
    "private_key": "A9DF0A9B617197896FC27102472A5C65E9C4E2CA369EF1AD6EE4A02FABE57CEB",
    "public_key": "A9E801A1CFDF08A80E2423D1D0DDC257F2032E225A68CE31697E3B76F7065FC0",
    "wallet_number": "159",
    "wallet": "xrb_3cha18iwzqrao194aayjt5gw6ozk1eq46pmasrrpkzjuguuieqy1p1cpieez"
  }
}
```

### COMMAND: bip39_to_seed

:warning: WARNING: Sensible data -> Bip39 and Seed.

- Description:

Extracts Seed from Bip39.

command|type|required
-------|----|-------|
bip39_to_seed|command|yes
bip39|Bip39 world list|yes

**Example**

Extract Seed from word list **dry history analyst regular resemble belt exercise motor hungry pizza purity convince narrow ancient arrange hard affair cloth pigeon board grain all story genre**.

```sh
curl --request POST \
  --url 'http://localhost/template.php?=' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'bip39=sure slam umbrella race obvious grass length aisle stick frog cinnamon unfair rebuild upon chest gallery home insane cage clarify space pave general head' \
  --data command=bip39_to_seed
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "seed": "DA1963B0D8398ACBE0002DD5ABA4A4768B35DDC9E2F86D0E9C8094FD05431833",
  "bip39": "sure slam umbrella race obvious grass length aisle stick frog cinnamon unfair rebuild upon chest gallery home insane cage clarify space pave general head"
}
```

### COMMAND: bip39_to_encrypted_stream

:warning: WARNING: Sensible data -> Bip39 and Your Password.

- Description:

Encrypts Bip39 with a non deterministic cryptography algorithm with given password.

command|type|required
-------|----|-------|
bip39_to_encrypted_stream|command|yes
bip39|Bip39 world list|yes
password|Password|yes

**Example**

Encrypt Bip39 word list **canyon grace rifle volume rabbit plunge nest plug seven tribe among honey code pear remove know calm grid check bleak visa because ordinary plug** with password **_MyPasswordHereWithNumber124Symbols@!%*AndText_**.

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=bip39_to_encrypted_stream \
  --data 'password=MyPasswordHereWithNumber124Symbols@!%*AndText' \
  --data 'bip39=canyon grace rifle volume rabbit plunge nest plug seven tribe among honey code pear remove know calm grid check bleak visa because ordinary plug'
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "encrypted_stream": "5f6e616e6f77616c6c657466696c655f000001004e
414e4f205365656420456e637279707465642066696c652f73747265616d2e20
4b656570206974207361666520616e64206261636b75702069742e2054686973
2066696c652069732070726f7465637465642062792070617373776f72642e20
42555920424954434f494e20616e64204e414e4f202121210075a9ab67d0c438
2bd0443e2f285e29b29a41fa029030330b05a3b57c71a8b6ea644199683e1155
c072f48a828ecf28f5d11e461efd49bab4065225b48e30d9068ca68409ddae09
cac9f5f688e27fa87865679b008676d15538020b2134fc6242121e3e5dea3e2d
961d53abee976e60ddee96e4e87f21dc2640a50334e6e3268c9cb6fea00a4866
dc2d66ad134eaed3148be7dc7fe8373282d0522924a8f98c2b0b237db3e84b7e
fabc002e59bc46aad8cf08c9287e32d12f7f3102d20a399d0f77fd2653b0ba68
09839e8c15eea361933107"
}
```

### COMMAND: block_to_p2pow

- Description:

Creates a P2PoW block given a Nano block and Fee amount and Worker Wallet

command|type|required
-------|----|-------|
block_to_p2pow|command|yes
block|Nano block|yes
wallet|Worker wallet|yes
worker_representative|Worker representative|no (If omitted then user wallet representative is used)
fee|Worker fee|yes
fee_type|Fee type|no (If omited then Big Number real type is assumed in worker fee. See table below)

Fee type|Description
----------|-----------
real|Big number real string
raw|Big number raw string
hex|Big number hex string

**Example 1**

Set 0.001 fee to worker nano_3sz1yqgpamu3pogqu4ehcusctxq1gxjcmyj6bw1t14ix3s5orhb3hc3pa9xi

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=block_to_p2pow \
  --data block=000000000000000000000000000000000000000000000000000000000000000697a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779000000000000000000000000000000000000000000000000000000000000000022f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b60000022b5baaf3cc1c18e4430000000079640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
  --data wallet=nano_3sz1yqgpamu3pogqu4ehcusctxq1gxjcmyj6bw1t14ix3s5orhb3hc3pa9xi \
  --data fee=0.001
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "block": "0000000000000000000000000000000000000000000000000000000000000006
97a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779
0000000000000000000000000000000000000000000000000000000000000000
22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
0000022b5baaf3cc1c18e44300000000
79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1
00
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000
0000000000000000000000000000000000000000000000000000000000000006
97a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779
141e2acb441da0fbbebfeafb97894cb7e0452324a12153a82c0250f571fe4cc3
22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
0000022b586fc58f7c48640618000000
e7e0f5dd644f61b55d7d898f56f2ad76e07762a9fa244f01a00a1d0e475c3d21
00
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000"
}
```

**Example 2**

Set 200000000000000000000000000 (Raw fee 0.0002) to worker nano_3sz1yqgpamu3pogqu4ehcusctxq1gxjcmyj6bw1t14ix3s5orhb3hc3pa9xi with representative xrb_3cha18iwzqrao194aayjt5gw6ozk1eq46pmasrrpkzjuguuieqy1p1cpieez:

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=block_to_p2pow \
  --data block=000000000000000000000000000000000000000000000000000000000000000697a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779000000000000000000000000000000000000000000000000000000000000000022f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b60000022b5baaf3cc1c18e4430000000079640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
  --data wallet=nano_3sz1yqgpamu3pogqu4ehcusctxq1gxjcmyj6bw1t14ix3s5orhb3hc3pa9xi \
  --data fee=200000000000000000000000000 \
  --data representative=xrb_3cha18iwzqrao194aayjt5gw6ozk1eq46pmasrrpkzjuguuieqy1p1cpieez \
  --data fee_type=raw
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "block": "0000000000000000000000000000000000000000000000000000000000000006
97a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779
0000000000000000000000000000000000000000000000000000000000000000
22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
0000022b5baaf3cc1c18e44300000000
79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00
0000000000000000
0000000000000000000000000000000000000000000000000000000000000006
97a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779
141e2acb441da0fbbebfeafb97894cb7e0452324a12153a82c0250f571fe4cc3
a9e801a1cfdf08a80e2423d1d0ddc257f2032e225a68ce31697e3b76f7065fc0
0000022b5b0584266288ca9d38000000
e7e0f5dd644f61b55d7d898f56f2ad76e07762a9fa244f01a00a1d0e475c3d21
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
04
0000000000000000"
}
```
/////////////////////////////////////////////////////////////

### COMMAND: brainwallet

- Description:

Extract Nano Seed and Bip39 from a phrase/text

command|type|required
-------|----|-------|
brainwallet|command|yes
text|Text|yes
salt|Salt|yes

**Example**

Extract Bip39 and Nano Seed from text: **Let the future tell the truth, and evaluate each one according to his work and accomplishments. The present is theirs; the future, for which I have really worked, is mine (Nikola Tesla - 10 July 1856 - 7 January 1943)**

and salt: **YourEmailHereYourSaltHere**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=brainwallet \
  --data 'text=Let the future tell the truth, and evaluate each one according to his work and accomplishments. The present is theirs; the future, for which I have really worked, is mine (Nikola Tesla - 10 July 1856 - 7 January 1943)' \
  --data salt=YourEmailHereYourSaltHere
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "text": "Let the future tell the truth, and evaluate each one according to his work and accomplishments. The present is theirs; the future, for which I have really worked, is mine (Nikola Tesla - 10 July 1856 - 7 January 1943)",
  "salt": "YourEmailHereYourSaltHere",
  "extracted": {
    "result": {
      "seed": "8A492E10D7E71D145A19D5901D7B79BAA0228A8878A74AFC21FF74A5410B353B",
      "bip39": "medal enact loud quit impact mechanic half deny mosquito type taxi inspire acquire earn capable belt enough three lemon true favorite machine stay gossip"
    },
    "warning_msg": "[Perfect!] 3.34x10^53 Years to crack"
  },
  "warning": "It is recommended to extract your brainwallet from your own hardware. Keep your brainwallet, seed, bip39 and salt safe."
}
```

### COMMAND: calculate_work_from_block

- Description:

Calculates work given a Nano block

command|type|required
-------|----|-------|
calculate_work_from_block|command|yes
block|Hex string block|yes
n_thr|Number of CPU threads|yes

**Example**

Calculate the Proof of Work of the Nano Block below using 4 CPU threads:

```sh
0000000000000000000000000000000000000000000000000000000000000006
1be0ede8eccb11888d818ab956e43ac69f93e3d861d80501a1badd52c60641aa
79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c6
22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
000004b80cf49e72c25b9bdf19b00000
79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1
cc229c54ab496f6580715d53a4214ccd0fb17a9666f9c59030bb843213ed1088bdfbb1ad5e878a8097af38c8e0827ab0c729b7e108633e183b4e5665e567040d
00
0000000000000000

# Human readable (JSON Equivalent)
# {
#   "error": "0",
#   "reason": "Success",
#   "block": {
#     "action": "process",
#     "json_block": "true",
#     "block": {
#       "type": "state",
#       "account": "nano_18z1xqngskrjj48r54oscuk5ojnzkhjxirgr1n1t5gpxcd51eifctzbfq3ti",
#       "previous": "79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C6",
#       "representative": "nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc",
#       "balance": "95711629863500000000000000000000",
#       "link": "79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1",
#       "link_as_account": "nano_1yd63ww31cjq75qwmno3k58wok5i48ugpczzmh8j3wb61qp9fp835zfzanwe",
#       "signature": "CC229C54AB496F6580715D53A4214CCD0FB17A9666F9C59030BB843213ED1088BDFBB1AD5E878A8097AF38C8E0827AB0C729B7E108633E183B4E5665E567040D",
#       "work": "0000000000000000"
#     }
#   }
# }
```

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=calculate_work_from_block \
  --data block=00000000000000000000000000000000000000000000000000000000000000061be0ede8eccb11888d818ab956e43ac69f93e3d861d80501a1badd52c60641aa79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c622f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6000004b80cf49e72c25b9bdf19b0000079640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1cc229c54ab496f6580715d53a4214ccd0fb17a9666f9c59030bb843213ed1088bdfbb1ad5e878a8097af38c8e0827ab0c729b7e108633e183b4e5665e567040d000000000000000000 \
  --data n_thr=4
```

**Return value**

```sh

{
  "error": "0",
  "reason": "Success",
  "block": "0000000000000000000000000000000000000000000000000000000000000006
1be0ede8eccb11888d818ab956e43ac69f93e3d861d80501a1badd52c60641aa
79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c6
22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
000004b80cf49e72c25b9bdf19b00000
79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1
cc229c54ab496f6580715d53a4214ccd0fb17a9666f9c59030bb843213ed1088bdfbb1ad5e878a8097af38c8e0827ab0c729b7e108633e183b4e5665e567040d
00
2cb275b1910cc89b"
}


# Human readable result (JSON Equivalent)
# {
#   "error": "0",
#   "reason": "Success",
#   "block": {
#     "action": "process",
#     "json_block": "true",
#     "block": {
#       "type": "state",
#       "account": "nano_18z1xqngskrjj48r54oscuk5ojnzkhjxirgr1n1t5gpxcd51eifctzbfq3ti",
#       "previous": "79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C6",
#       "representative": "nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc",
#       "balance": "95711629863500000000000000000000",
#       "link": "79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1",
#       "link_as_account": "nano_1yd63ww31cjq75qwmno3k58wok5i48ugpczzmh8j3wb61qp9fp835zfzanwe",
#       "signature": "CC229C54AB496F6580715D53A4214CCD0FB17A9666F9C59030BB843213ED1088BDFBB1AD5E878A8097AF38C8E0827AB0C729B7E108633E183B4E5665E567040D",
#       "work": "9BC80C91B175B22C"
#     }
#   }
# }
```

### COMMAND: compare

- Description:

Compare two Nano big numbers

command|type|required
-------|----|-------|
compare|command|yes
valuea|A value|yes
valueb|B value|yes
compare|compare modes (See compare modes table below)|yes
typea|A value type. See A/B value type options below.|yes
typeb|B value type. See A/B value type options below.|yes

compare|description
-------|-----------
eq|A is EQUAL B
lt|A is LESS THAN B
gt|A is GREATER THAN B
geq|A is GREATER or EQUAL B
leq|A is LESSER THAN B

typea/b|description
-------|-----------
real|Nano big number A/B input is real type
raw|Nano big number A/B input is raw type
hex|Nano big number A/B input is hex string type

**Return value**

_result_ = 1 - for TRUE
_result_ = 0 - for FALSE

**Example 1**

Compare if A = '5.261762' (real) is greater than B = '3' (real);

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=compare \
  --data valuea=5.261762 \
  --data valueb=3 \
  --data compare=gt \
  --data typeb=real \
  --data typea=real
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "value_a": "5.261762",
  "value_b": "3",
  "result": "1"
}
```

**Example 2**

Compare if A = '621762.182721827846' (real) is EQUAL than B = '621762182721827846000000000000000000' (raw);

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=compare \
  --data valuea=621762.182721827846 \
  --data valueb=621762182721827846000000000000000000 \
  --data compare=eq \
  --data typeb=raw \
  --data typea=real
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "value_a": "621762.182721827846",
  "value_b": "621762182721827846000000000000000000", // Human readable real value 621762.182721827846
  "result": "1" // True
}
```

**Example 3**

Compare if A = '00009d632382e95f9ed7ce322c800000' (hex) is LESS THAN than B = '681190192881000000000000000000000' (raw);

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=compare \
  --data valuea=00009d632382e95f9ed7ce322c800000 \
  --data valueb=681190192881000000000000000000000 \
  --data compare=lt \
  --data typeb=raw \
  --data typea=hex
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "value_a": "00009d632382e95f9ed7ce322c800000",  // Human readable real value 3192.1928861
  "value_b": "681190192881000000000000000000000", // Human readable real value 681.190192881
  "result": "0" // (3192.1928861 <= 681.190192881) = FALSE
}
```

### COMMAND: from_multiplier

- Description:

Calculates a relative _difficulty_ given a multiplier

command|type|required
-------|----|-------|
from_multiplier|command|yes
multiplier|Multiplier value|yes
base_difficulty|Base difficulty|Optional. If ommited then base difficulty = 0xffffffc000000000

**Example 1**

```sh
curl --request POST \
  --url http://localhost/chksig.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=from_multiplier \
  --data multiplier=4.0
```

**Return value**

```sh
{
  "difficulty": "0xfffffff000000000",
  "multiplier": "4.0",
  "base_difficulty": "0xffffffc000000000"
}
```

**Example 2**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=from_multiplier \
  --data multiplier=4.0 \
  --data base_difficulty=0xfffffee000000000
```

**Return value**

```sh
{
  "difficulty": "0xffffffb800000000",
  "multiplier": "4.0",
  "base_difficulty": "0xfffffee000000000"
}
```

In development ...
## License
MIT

