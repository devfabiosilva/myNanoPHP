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

### COMMAND: gen_seed_to_encrypted_stream

- Description:

Generates a SEED given a selected entropy and encrypt it in a stream with password

command|type|required
-------|----|-------|
gen_seed_to_encrypted_stream|command|yes
entropy|Entropy type|yes. See entropy type.
password|Password|yes

Entropy type:

- _paranoic_ (Very slow but strongly recommended)
- _excelent_ (Slow and very strong)
- _good_ (Good entropy)
- _not_enough_ (Fast but not enough entropy. You can use it to generate temporary seeds)
- _not_recommended_ (Very fast but not recommended. You can use it to generate temporary seeds as well)


**Example**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=gen_seed_to_encrypted_stream \
  --data password=MyPasswordHere@1 \
  --data entropy=good
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "encrypted_seed": "5f6e616e6f77616c6c657466696c655f000001004e414e4f205365656420456e637279707465642066696c652f73747265616d2e204b65657020697420736166
6520616e64206261636b75702069742e20546869732066696c652069732070726f7465637465642062792070617373776f72642e2042555920424954434f494e
20616e64204e414e4f2021212100a79e1b4a4a2b04e5a48d1290afed50768b7fe414b4eaab0d3bd4f7549f36c662bdf51b1362cedfb2c5bd51431ebd5f6d117e
6706f035147ad7bf9180760d55d6ca64f077d9f8304b15e08756ee3b2aa0d34b5a3741e1202bf08a91e8de9c5f328db10d044fed0e39e3e37d6f2a56dcbe2308
d02ee90ec3603f6fc36eaeb084edf3aa257654599d0d936ec93386ab6adb037d0f3ec454483708e64d27083de0ec2efcc896d779198f5d10ff350fa47b37e139
8b6289c7317632cb29ac58aee636d771cab1533d29da48d79593c0e7de743810"
}
```

### COMMAND: create_block

- Description:

Creates a Nano block with transaction parameters

command|type|required
-------|----|-------|
create_block|command|yes
account|Nano owner account or Public key|yes. 
previous|Previous block in Nano blockchain|No. If ommited then genesis block will be parsed to block
representative|Representative of the owner account|Yes. You can use Nano representative wallet or representative public key
balance|Current balance of the owner account|yes
balance_type|Balance type|No. If ommited then real value is asumed. See Nano big number types below
val_send_rec|Value to send/receive|Yes
val_send_rec_type|Value to send/receive type|No. If ommited real value is asumed. See Nano big number types below
link|Link or destination wallet|Yes. Destination wallet or destination public key or link
direction|Direction (send/receive)|Yes. Use _send_ to send amount or _receive_ to receive amount

Nano big number|description
---------------|-----------
real|Real value
raw|Raw value
hex|Hex value

**Example 1**

Create a block given:

**account**: _nano_18z1xqngskrjj48r54oscuk5ojnzkhjxirgr1n1t5gpxcd51eifctzbfq3ti_
**previous**: _79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C6_
**representative**: _nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc_
**balance**: _129.8918198635_
**val_send_rec**: _34.18019_
**link**: _CC2D7D29B41D2C00D6B09212D4F9D9404100F8F45131270CEF54E878D19AE1B7_
**direction**: _receive_


```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=create_block \
  --data account=nano_18z1xqngskrjj48r54oscuk5ojnzkhjxirgr1n1t5gpxcd51eifctzbfq3ti \
  --data previous=79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C6 \
  --data representative=nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc \
  --data balance=129.8918198635 \
  --data val_send_rec=34.18019 \
  --data link=CC2D7D29B41D2C00D6B09212D4F9D9404100F8F45131270CEF54E878D19AE1B7 \
  --data direction=receive
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
00000816e1419f277d97547955b00000
cc2d7d29b41d2c00d6b09212d4f9d9404100f8f45131270cef54e878d19ae1b7
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00
0000000000000000"
}
```

**Example 2**

Create a block given:

**account**: _nano_3k514btezr5b1ibocrwosod9n4b7y3h65nkgznem4bpipe9o79n4urew5z9u_

**previous**: _C08247A3E3F57A49D53FD18A7AC15713AE5228BB4C05AFD7DEB1701227C6FA2E_

**representative**: _xrb_3dz7tajxro7q7s85zniiekqggepb411qfsfdbes79b9g7r7khwzg115muyqt_

**balance**: _12910192800000000000000000000000000_

**balance_type**: _raw_

**val_send_rec**: _127.1900000000002182951_

**link**: _nano_37wpu4enfqkosw98ogxwi433kr75754sf7uhfqfwwm5kn5hzzfqh167h8us8_

**direction**: _send_


```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=create_block \
  --data account=nano_3k514btezr5b1ibocrwosod9n4b7y3h65nkgznem4bpipe9o79n4urew5z9u \
  --data previous=C08247A3E3F57A49D53FD18A7AC15713AE5228BB4C05AFD7DEB1701227C6FA2E \
  --data representative=xrb_3dz7tajxro7q7s85zniiekqggepb411qfsfdbes79b9g7r7khwzg115muyqt \
  --data balance=12910192800000000000000000000000000 \
  --data val_send_rec=127.1900000000002182951 \
  --data link=nano_37wpu4enfqkosw98ogxwi433kr75754sf7uhfqfwwm5kn5hzzfqh167h8us8 \
  --data direction=send \
  --data balance_type=raw
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "block": "0000000000000000000000000000000000000000000000000000000000000006
c8601274cfe0690413556395cd567a0925f05e41d24efd193126d0b30f529e82
c08247a3e3f57a49d53fd18a7ac15713ae5228bb4c05afd7deb1701227c6fa2e
afe5d223dc54b72e4c3fd21064aee732c9100176e5ab4b3253a4ee2e0b27f3ee
000276402db65efe4b8dd0c60c4aa800
9796d89946de55cf0e6abbbc80821960a328c596976f6ddbce4c72a0dfffb6ef
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
04
0000000000000000"
}
```

### COMMAND: gen_seed

- Description:

Generates Nano SEED given a entropy

command|type|required
-------|----|-------|
gen_seed|command|yes
entropy|Entropy type|yes. See entropy type.

Entropy type:

- _paranoic_ (Very slow but strongly recommended)
- _excelent_ (Slow and very strong)
- _good_ (Good entropy)
- _not_enough_ (Fast but not enough entropy. You can use it to generate temporary seeds)
- _not_recommended_ (Very fast but not recommended. You can use it to generate temporary seeds as well)

**Example**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=gen_seed \
  --data entropy=excelent
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "c_iternal_entropy_name": "F_ENTROPY_TYPE_EXCELENT",
  "seed_and_bip39": {
    "seed": "A3790A86C7817CFDBB22C7C9E8165CD76A7D099EACEEBF436BDC7723B3B80694",
    "bip39": "pet sign payment monitor blind learn uncle flight size doll now put pond luggage kingdom oven satisfy brave warfare unusual depth swing bottom oil"
  },
  "warning": "It is not recommended to generate seed outside your hardware. Try to generate seed in your own hardware. Keep your SEED and Bip39 safe!"
}
```

### COMMAND: generate_token

- Description:

Generates a non deterministic hash token using Blake2b algorithm

command|type|required
-------|----|-------|
generate_token|command|yes
passwd|Password for hash token|yes
text|Input text|yes

**Example**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=generate_token \
  --data text=MyTextHere \
  --data passwd=myPassWordHere123@456
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "text": "MyTextHere",
  "token": "f1f8a35055bd38c63208661e0086f223"
}
```

See _verify_token_ command

### COMMAND: get_account_from_block

- Description:

Gets account from block

command|type|required
-------|----|-------|
get_account_from_block|command|yes
block|Nano block|yes
type|Type|No. If ommited _wallet_ is used. Options are _raw_ for public key or _wallet_
prefix|Prefix|No. If ommited and _type_ = _wallet_ then _nano__ prefix is used

**Example 1**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=get_account_from_block \
  --data block=0000000000000000000000000000000000000000000000000000000000000006918105963ce5d61ad9d74d294164fac36a077b5e2b53d219e619d5ee3e64e1b0f9252d13ec4103ccc6b1f1712c617413adc741d16a465452ca90c504d9f2c27822f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b600001b9dd181a316c69b1feb73b30000f9640ff8804a3720efc9d2a190cdcac87011b6eb2bff9bcda6e15400ec76d8b084daaa49ccf95d10353b93711c24e605aa2219dac2e5020996619f7184bb8733ee733d2a2e033481aa5bf82652aa201b63a58f6ef4cd43a8468f6112d4ad8d07003551a54e5f0f25d0 \
  --data type=wallet \
  --data prefix=xrb_
```

**Return value**

```sh
{
  "wallet": "xrb_36e31pd5ssgp5dexgmbba7khoiuc1xxowctmtaeye8goxrz8brfi48iexshm"
}
```

**Example 2**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=get_account_from_block \
  --data block=0000000000000000000000000000000000000000000000000000000000000006918105963ce5d61ad9d74d294164fac36a077b5e2b53d219e619d5ee3e64e1b0f9252d13ec4103ccc6b1f1712c617413adc741d16a465452ca90c504d9f2c27822f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b600001b9dd181a316c69b1feb73b30000f9640ff8804a3720efc9d2a190cdcac87011b6eb2bff9bcda6e15400ec76d8b084daaa49ccf95d10353b93711c24e605aa2219dac2e5020996619f7184bb8733ee733d2a2e033481aa5bf82652aa201b63a58f6ef4cd43a8468f6112d4ad8d07003551a54e5f0f25d0 \
  --data type=raw
```

**Return value**

```sh
{
  "public_key": "918105963CE5D61AD9D74D294164FAC36A077B5E2B53D219E619D5EE3E64E1B0"
}
```

### COMMAND: get_balance_from_block

- Description:

Extracts balance from a Nano Block

command|type|required
-------|----|-------|
get_balance_from_block|command|yes
block|Nano block|yes
type|Balance type|No. If ommited real type is used. Available types are: _raw_, _real_, _hex_

**Example 1**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=get_balance_from_block \
  --data block=0000000000000000000000000000000000000000000000000000000000000006095b645b6c0cccb52dd65218de613ce13cea58a850a80c3f704291b698a50417de0c84215a6b7429d3d2836f54b6b917c9301103134904457a928c56580cf5a4c798cff4f1131204f65c4d22c3e6316f26f380ee0616aadbabea1268fd75fb050000057ce450710233bcf19bf8000000f45b8087702b867f9736ae82628708e57780b1eb004e123cf2822a5cb935af1700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
  --data type=raw
```

**Return value**

```sh
{
  "balance": "111307000000000000000000000000000"
}
```

**Example 2**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=get_balance_from_block \
  --data block=0000000000000000000000000000000000000000000000000000000000000006095b645b6c0cccb52dd65218de613ce13cea58a850a80c3f704291b698a50417de0c84215a6b7429d3d2836f54b6b917c9301103134904457a928c56580cf5a4c798cff4f1131204f65c4d22c3e6316f26f380ee0616aadbabea1268fd75fb050000057ce450710233bcf19bf8000000f45b8087702b867f9736ae82628708e57780b1eb004e123cf2822a5cb935af1700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
  --data type=hex
```

**Return value**

```sh
{
  "balance": "0000057ce450710233bcf19bf8000000"
}
```

**Example 3**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=get_balance_from_block \
  --data block=0000000000000000000000000000000000000000000000000000000000000006095b645b6c0cccb52dd65218de613ce13cea58a850a80c3f704291b698a50417de0c84215a6b7429d3d2836f54b6b917c9301103134904457a928c56580cf5a4c798cff4f1131204f65c4d22c3e6316f26f380ee0616aadbabea1268fd75fb050000057ce450710233bcf19bf8000000f45b8087702b867f9736ae82628708e57780b1eb004e123cf2822a5cb935af1700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

**Return value**

```sh
{
  "balance": "111.307"
}
```

### COMMAND: get_block_hash

- Description:

Calculates and extracts Blake2b hash of the valid Nano block

command|type|required
-------|----|-------|
get_block_hash|command|yes
block|Nano block|yes

**Example**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=get_block_hash \
  --data block=000000000000000000000000000000000000000000000000000000000000000697a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779f9252d12ec2103cad6b2e7212c617413adc741d16a465452ca90c504d9f2c27822f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6000000e9a44e168ac332b4814c50000079640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1db7e03af6b43484cb51bedad49a76029dcd265600f3b3c98622960219d825b35cc1e3219a600898aba00f2b90eb4439dd3cbcb9d7c3fee6d544d483ea2039e0b000000000000000000
```

**Return value**

```sh
{
  "hash": "2FC9637C3B2681D03F9167173641869A54F2B2A326CD41F05C82B68F05E69F7F"
}
```

### COMMAND: get_difficulty

- Description:

Calculates a difficulty and verifies if work is valid given work, threshold and hash

command|type|required
-------|----|-------|
get_difficulty|command|yes
hash|Nano block hash|yes
work|Given work|yes
threshold|Threshold|No. Optional. If ommited then default Nano threshold is used

**Example**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=get_difficulty \
  --data hash=b0cbcbe1b522fbac1ba1b1880dcea19afdae31008a242b7d9c6165982559fe53 \
  --data work=0xa5422ca8ae8ca022 \
  --data threshold=18446743901642424320
```

**Return value**

```sh
{
  "hash": "b0cbcbe1b522fbac1ba1b1880dcea19afdae31008a242b7d9c6165982559fe53",
  "work": "0xa5422ca8ae8ca022",
  "difficulty": "0xfffffff23e8131c1",
  "base_difficulty": "0xffffffd7f0000000",
  "multiplier": "2.91239914457107",
  "valid": "1"
}
# valid: "1" if VALID
# valid: "0" if INVALID
```

### COMMAND: get_link_from_block

- Description:

Gets a link or destination wallet from Nano block;

command|type|required
-------|----|-------|
get_link_from_block|command|yes
block|Nano block|yes
type|Nano link type: Address or destination public key or link|No. If ommited wallet with _nano__ prefix is returned
prefix|Nano prefix|No. If type = wallet then wallet is returned with given prefix (_nano__ or _xrb__)

**Example 1**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=get_link_from_block \
  --data block=0000000000000000000000000000000000000000000000000000000000000006095b645b6c0cccb52dd65218de613ce13cea58a850a80c3f704291b698a50417de0c84215a6b7429d3d2836f54b6b917c9301103134904457a928c56580cf5a4c798cff4f1131204f65c4d22c3e6316f26f380ee0616aadbabea1268fd75fb050000057ce450710233bcf19bf8000000f45b8087702b867f9736ae82628708e57780b1eb004e123cf2822a5cb935af1700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
  --data type=wallet \
  --data prefix=xrb_
```

**Return value**

```sh
{
  "wallet": "xrb_3x4ui45q1cw8hydmfdn4ec5ijsdqi4ryp14g4ayh71jcdkwmddrq7ca9xzn9"
}
```

**Example 2**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=get_link_from_block \
  --data block=0000000000000000000000000000000000000000000000000000000000000006095b645b6c0cccb52dd65218de613ce13cea58a850a80c3f704291b698a50417de0c84215a6b7429d3d2836f54b6b917c9301103134904457a928c56580cf5a4c798cff4f1131204f65c4d22c3e6316f26f380ee0616aadbabea1268fd75fb050000057ce450710233bcf19bf8000000f45b8087702b867f9736ae82628708e57780b1eb004e123cf2822a5cb935af1700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
  --data type=raw
```

**Return value**

```sh
{
  "public_key": "F45B8087702B867F9736AE82628708E57780B1EB004E123CF2822A5CB935AF17"
}
```

### COMMAND: get_prefixes_from_block

- Description:

Gets prefixes from block

command|type|required
-------|----|-------|
get_prefixes_from_block|command|yes
block|Nano block|yes

**Example**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=get_prefixes_from_block \
  --data block=0000000000000000000000000000000000000000000000000000000000000006095b645b6c0cccb52dd65218de613ce13cea58a850a80c3f704291b698a50417de0c84215a6b7429d3d2836f54b6b917c9301103134904457a928c56580cf5a4c798cff4f1131204f65c4d22c3e6316f26f380ee0616aadbabea1268fd75fb050000057ce450710233bcf19bf8000000f45b8087702b867f9736ae82628708e57780b1eb004e123cf2822a5cb935af1700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000
```

**Return value**

```sh
{
  "prefixes": "2"
}
```

### COMMAND: get_previous_from_block

- Description:

Gets previous hash from given block

command|type|required
-------|----|-------|
get_previous_from_block|command|yes
block|Nano block|yes

**Example**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=get_previous_from_block \
  --data block=0000000000000000000000000000000000000000000000000000000000000006918105963ce5d61ad9d74d294164fac36a077b5e2b53d219e619d5ee3e64e1b0f9252d13ec4103ccc6b1f1712c617413adc741d16a465452ca90c504d9f2c27822f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b600001b9dd181a316c69b1feb73b30000f9640ff8804a3720efc9d2a190cdcac87011b6eb2bff9bcda6e15400ec76d8b084daaa49ccf95d10353b93711c24e605aa2219dac2e5020996619f7184bb8733ee733d2a2e033481aa5bf82652aa201b63a58f6ef4cd43a8468f6112d4ad8d07007865287ae2880e4a
```

**Return value**

```sh
{
  "previous": "F9252D13EC4103CCC6B1F1712C617413ADC741D16A465452CA90C504D9F2C278"
}
```

### COMMAND: get_representative_from_block

- Description:

Gets a representative public key or representative wallet from Nano block

command|type|required
-------|----|-------|
get_representative_from_block|command|yes
block|Nano block|yes
type|Nano link type: Representative public key or representative wallet|No. If ommited wallet with _nano__ prefix is returned
prefix|Nano prefix|No. If type = wallet then wallet is returned with given prefix (_nano__ or _xrb__)

**Example 1**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=get_representative_from_block \
  --data block=0000000000000000000000000000000000000000000000000000000000000006095b645b6c0cccb52dd65218de613ce13cea58a850a80c3f704291b698a50417de0c84215a6b7429d3d2836f54b6b917c9301103134904457a928c56580cf5a4c798cff4f1131204f65c4d22c3e6316f26f380ee0616aadbabea1268fd75fb050000057ce450710233bcf19bf8000000f45b8087702b867f9736ae82628708e57780b1eb004e123cf2822a5cb935af1700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
  --data type=raw
```

**Return value**

```sh
{
  "public_key": "C798CFF4F1131204F65C4D22C3E6316F26F380EE0616AADBABEA1268FD75FB05"
}
```

**Example 2**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=get_representative_from_block \
  --data block=0000000000000000000000000000000000000000000000000000000000000006095b645b6c0cccb52dd65218de613ce13cea58a850a80c3f704291b698a50417de0c84215a6b7429d3d2836f54b6b917c9301103134904457a928c56580cf5a4c798cff4f1131204f65c4d22c3e6316f26f380ee0616aadbabea1268fd75fb050000057ce450710233bcf19bf8000000f45b8087702b867f9736ae82628708e57780b1eb004e123cf2822a5cb935af1700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
  --data type=wallet \
  --data prefix=xrb_
```

**Return value**

```sh
{
  "wallet": "xrb_3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k"
}
```

### COMMAND: get_signature_from_block

- Description:

Gets a signature from Nano block

command|type|required
-------|----|-------|
get_signature_from_block|command|yes
block|Nano block|yes

**Example**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=get_signature_from_block \
  --data block=0000000000000000000000000000000000000000000000000000000000000006918105963ce5d61ad9d74d294164fac36a077b5e2b53d219e619d5ee3e64e1b0f9252d13ec4103ccc6b1f1712c617413adc741d16a465452ca90c504d9f2c27822f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b600001b9dd181a316c69b1feb73b30000f9640ff8804a3720efc9d2a190cdcac87011b6eb2bff9bcda6e15400ec76d8b084daaa49ccf95d10353b93711c24e605aa2219dac2e5020996619f7184bb8733ee733d2a2e033481aa5bf82652aa201b63a58f6ef4cd43a8468f6112d4ad8d07003551a54e5f0f25d0
```

**Return value**

```sh
{
  "signature": "84DAAA49CCF95D10353B93711C24E605AA2219DAC2E5020996619F7184BB8733EE733D2A2E033481AA5BF82652AA201B63A58F6EF4CD43A8468F6112D4AD8D07"
}
```

### COMMAND: get_work_from_block

- Description:

Gets work from Nano block

command|type|required
-------|----|-------|
get_work_from_block|command|yes
block|Nano block|yes

**Example**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=get_work_from_block \
  --data block=0000000000000000000000000000000000000000000000000000000000000006918105963ce5d61ad9d74d294164fac36a077b5e2b53d219e619d5ee3e64e1b0f9252d13ec4103ccc6b1f1712c617413adc741d16a465452ca90c504d9f2c27822f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b600001b9dd181a316c69b1feb73b30000f9640ff8804a3720efc9d2a190cdcac87011b6eb2bff9bcda6e15400ec76d8b084daaa49ccf95d10353b93711c24e605aa2219dac2e5020996619f7184bb8733ee733d2a2e033481aa5bf82652aa201b63a58f6ef4cd43a8468f6112d4ad8d07007865287ae2880e4a
```

**Return value**

```sh
{
  "work": "0x4a0e88e27a286578"
}
```

### COMMAND: library_info

- Description:

Gets information about myNanoPHP library

command|type|required
-------|----|-------|
library_info|command|yes

**Example**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=library_info
```

**Return value**

```sh
{
  "name": "myNanoEmbedded C library for PHP",
  "version": "0.1.0",
  "fenix_protocol_support": "disabled",
  "bip39_support": "yes",
  "brain_wallet_support": "yes",
  "proof_of_work": "yes",
  "dpow_support": "yes",
  "p2pow_support": "yes",
  "multithread_support": "yes",
  "license": "MIT",
}
```

### COMMAND: license

- Description:

Gets license

command|type|required
-------|----|-------|
license|command|yes

### COMMAND: verify_sig

- Description:

Verifies if hash has valid signature.

command|type|required
-------|----|-------|
verify_sig|command|yes
sig|signature|yes
hash|Blake2b hash|yes
pk|Public key or Nano wallet|yes

**Example 1**

```sh
curl --request POST \
  --data command=verify_sig \
  --url 'http://localhost/template.php?=' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data pk=nano_1qgkdadcbwn65sp95gr144fuc99tm5tn6gx9y8ow9bgaam6r5ixgtx19tw93 \
  --data hash=ED7A841AA594E6637CCD94C024379E795B1F392393C18057ACC7A9F714887553 \
  --data sig=A30618E073A9266BD4087A6D5BB141C7A7A4A4281B0171BE0027678408368E9DE33D91B2AB7406B9876315DDFC33EFB2C2FB795597A40EEE717D520BEBC63A07
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "hash": "ED7A841AA594E6637CCD94C024379E795B1F392393C18057ACC7A9F714887553",
  "signature": "A30618E073A9266BD4087A6D5BB141C7A7A4A4281B0171BE0027678408368E9DE33D91B2AB7406B9876315DDFC33EFB2C2FB795597A40EEE717D520BEBC63A07",
  "publicKey": "nano_1qgkdadcbwn65sp95gr144fuc99tm5tn6gx9y8ow9bgaam6r5ixgtx19tw93",
  "validSignature": true
}
```

**Example 2**

```sh
curl --request POST \
  --url 'http://localhost/template.php?=' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data pk=5DD25A16A4F2841E6C71BB00109BB51CFA98F5423BA7F1ABC3A5C844C981C3AE \
  --data hash=ED7A841AA594E6637CCD94C024379E795B1F392393C18057ACC7A9F714887553 \
  --data sig=A30618E073A9266BD4087A6D5BB141C7A7A4A4281B0171BE0027678408368E9DE33D91B2AB7406B9876315DDFC33EFB2C2FB795597A40EEE717D520BEBC63A07 \
  --data command=verify_sig
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "hash": "ED7A841AA594E6637CCD94C024379E795B1F392393C18057ACC7A9F714887553",
  "signature": "A30618E073A9266BD4087A6D5BB141C7A7A4A4281B0171BE0027678408368E9DE33D91B2AB7406B9876315DDFC33EFB2C2FB795597A40EEE717D520BEBC63A07",
  "publicKey": "5DD25A16A4F2841E6C71BB00109BB51CFA98F5423BA7F1ABC3A5C844C981C3AE",
  "validSignature": true
}
```

### COMMAND: calculate_pow

- Description:

Calculates work from a hash

command|type|required
-------|----|-------|
calculate_pow|command|yes
hash|Hash|yes
num_threads|Number of threads|yes
threshold|Threshold|(Optional default threshold)

**Example 1**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=calculate_pow \
  --data hash=9d15f6100d0a20ce2bcf1468eb2b6b4e4de58b68d9e4631f18d399d14956bd53 \
  --data num_threads=4
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "hash": "9d15f6100d0a20ce2bcf1468eb2b6b4e4de58b68d9e4631f18d399d14956bd53",
  "result": {
    "pow": "0x5f90b492ab132b1d",
    "threshold": "0xffffffc000000000",
    "multiplier": "1.000000000000000"
  }
}
```

**Example 2**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=calculate_pow \
  --data hash=9d15f6100d0a20ce2bcf1468eb2b6b4e4de58b68d9e4631f18d399d14956bd53 \
  --data num_threads=4 \
  --data threshold=0xffffffe000000000
```

```sh
{
  "error": "0",
  "reason": "Success",
  "hash": "9d15f6100d0a20ce2bcf1468eb2b6b4e4de58b68d9e4631f18d399d14956bd53",
  "result": {
    "pow": "0x53b4f7e28b345d3d",
    "threshold": "0xffffffe000000000",
    "multiplier": "2.000000000000000"
  }
}
```

### COMMAND: seed2bip39

:warning: WARNING: Sensible data -> Bip39 and private key.

- Description:

Extracts Bip39 from Seed

command|type|required
-------|----|-------|
seed2bip39|command|yes
seed|SEED|yes

**Example**

```sh
curl --request POST \
  --url 'http://localhost/template.php?=' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data seed=DA1963B0D8398ACBE0002DD5ABA4A4768B35DDC9E2F86D0E9C8094FD05431833 \
  --data command=seed2bip39
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

### COMMAND: verify_work

- Description:

Verifies if a Work is valid given a threshold

command|type|required
-------|----|-------|
verify_work|command|yes
hash|Hash to be verified|yes
work|Work|yes
threshold|Threshold|Optional. If ommited default threshold is **0xffffffc000000000**


Returns _error: 0_ if work is valid, else returns non zero

**Example**

```sh
curl --request POST \
  --url 'http://localhost/template.php?=' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data hash=81b13962a2e0f2b61a49ff0bb9a90c0ba6fb5bb1e99569c98659bb5b77c91772 \
  --data work=0x88d703c9a7d78883 \
  --data command=verify_work
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "hash": "81b13962a2e0f2b61a49ff0bb9a90c0ba6fb5bb1e99569c98659bb5b77c91772",
  "work": "0x88d703c9a7d78883",
  "threshold": "0xffffffc000000000"
}
```

### COMMAND: nano2pk

- Description:

Parses __nano_ or __xrb_ wallet to public key

command|type|required
-------|----|-------|
nano2pk|command|yes
wallet|Nano wallet|yes

**Example**

```sh
curl --request POST \
  --url 'http://localhost/template.php?=' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data wallet=nano_1qgkdadcbwn65sp95gr144fuc99tm5tn6gx9y8ow9bgaam6r5ixgtx19tw93 \
  --data command=nano2pk
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "wallet": "nano_1qgkdadcbwn65sp95gr144fuc99tm5tn6gx9y8ow9bgaam6r5ixgtx19tw93",
  "public_key": "5DD25A16A4F2841E6C71BB00109BB51CFA98F5423BA7F1ABC3A5C844C981C3AE"
}
```

### COMMAND: p2pow_to_json

- Description:

Parses _P2PoW_ block to JSON

command|type|required
-------|----|-------|
p2pow_to_json|command|yes
block|P2PoW block|yes

**Example**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=p2pow_to_json \
  --data block=000000000000000000000000000000000000000000000000000000000000000677871ed613ae5e89cab6534bbc60bc50bcb61302e29aadf4bf0f48684ba8f5db7d77fabe00d9b6737d82d50a14d8f304cff88e92c93fb4ef87a63ef6b8bfa0b6d9e7850c949e424f9910daf274a14e3394c717589152cc25d622d6bf1fb77146000066b0fd855d5252a716a1c0cca260aee2460d734e1b6e1aa0bc759eb396b0b966acb26fe86d82758e30bad65fb9f221612873f05eed303d91926f861ee9cf4d87eec3c4864c4b6e39f87ca24833c534a4f3cb68d474725fdffc39352c49eaca58f7351892de4ad5e6fd03bbafdf03030000000000000000000000000000000000000000000000000000000000000000000000000000000677871ed613ae5e89cab6534bbc60bc50bcb61302e29aadf4bf0f48684ba8f5db0c453e8dd551635d0b5d36a83e88eb5aec2c783e08224fac338ff2f057863450d9e7850c949e424f9910daf274a14e3394c717589152cc25d622d6bf1fb77146000066b0f57169bac31dd6097ccca260bafc0f621906cb5274543a48e762f8f3aa8cb6432d4c463067b4ec294ea13654cd376ddbce5fcc2a9cf1978f720da004bd3ad06bbb9ff9097a048e1c801d099999ca034a717218c9750e3876fa0c5b791e8db0b88eb1a8f1854cea951a32bc09020000000000000000 
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "block": {
    "user_transaction": {
      "block_type": "state",
      "account": "xrb_1xw95ud39dkyj97dentdqjidrn7wprbi7rntoqtdy5taf37tjxgu3ds1reop",
      "previous": "7D77FABE00D9B6737D82D50A14D8F304CFF88E92C93FB4EF87A63EF6B8BFA0B6",
      "representative": "nano_3ph9in8bb9k4byej3pqkgkinwewnrwdoj6cksikxeappqwhugwc8ebrf7y8p",
      "balance": "2082828397110298387381988361020000",
      "link": "AEE2460D734E1B6E1AA0BC759EB396B0B966ACB26FE86D82758E30BAD65FB9F2",
      "link_as_account": "xrb_3dq4ar8q8miufrfc3h5omtssfe7setpd6uzafp39d5jiqdd7zghktgqjhqde",
      "signature": "21612873F05EED303D91926F861EE9CF4D87EEC3C4864C4B6E39F87CA24833C534A4F3CB68D474725FDFFC39352C49EACA58F7351892DE4AD5E6FD03BBAFDF03"
    },
    "worker_transaction": {
      "block_type": "state",
      "account": "xrb_1xw95ud39dkyj97dentdqjidrn7wprbi7rntoqtdy5taf37tjxgu3ds1reop",
      "previous": "0C453E8DD551635D0B5D36A83E88EB5AEC2C783E08224FAC338FF2F057863450",
      "representative": "nano_3ph9in8bb9k4byej3pqkgkinwewnrwdoj6cksikxeappqwhugwc8ebrf7y8p",
      "balance": "2082825897110298387381988361020000",
      "link": "BAFC0F621906CB5274543A48E762F8F3AA8CB6432D4C463067B4EC294EA13654",
      "link_as_account": "nano_3gqw3xj3k3pdcbt7agkawxjhjwxcjku68dcearr8hf9e779c4fkncabcxbdd",
      "signature": "CD376DDBCE5FCC2A9CF1978F720DA004BD3AD06BBB9FF9097A048E1C801D099999CA034A717218C9750E3876FA0C5B791E8DB0B88EB1A8F1854CEA951A32BC09"
    }
  }
}
```

### COMMAND: block_to_json

- Description:

Parses Nano Block to JSON

command|type|required
-------|----|-------|
block_to_json|command|yes
block|Nano Block|yes

**Example**

```sh
curl --request POST \
  --url http://localhost/template.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=block_to_json \
  --data block=00000000000000000000000000000000000000000000000000000000000000061be0ede8eccb11888d818ab956e43ac69f93e3d861d80501a1badd52c60641aa79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c622f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6000004b80cf49e72c25b9bdf19b0000079640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1cc229c54ab496f6580715d53a4214ccd0fb17a9666f9c59030bb843213ed1088bdfbb1ad5e878a8097af38c8e0827ab0c729b7e108633e183b4e5665e567040d002cb275b1910cc89b
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "block": {
    "action": "process",
    "json_block": "true",
    "block": {
      "type": "state",
      "account": "nano_18z1xqngskrjj48r54oscuk5ojnzkhjxirgr1n1t5gpxcd51eifctzbfq3ti",
      "previous": "79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C6",
      "representative": "nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc",
      "balance": "95711629863500000000000000000000",
      "link": "79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1",
      "link_as_account": "nano_1yd63ww31cjq75qwmno3k58wok5i48ugpczzmh8j3wb61qp9fp835zfzanwe",
      "signature": "CC229C54AB496F6580715D53A4214CCD0FB17A9666F9C59030BB843213ED1088BDFBB1AD5E878A8097AF38C8E0827AB0C729B7E108633E183B4E5665E567040D",
      "work": "9BC80C91B175B22C"
    }
  }
}
```

### COMMAND: pk2nano

- Description:

Parses a public key to Nano wallet address

command|type|required
-------|----|-------|
pk2nano|command|yes
pk|Public key|yes
prefix|Public key prefix _xrb__ or _nano__|no

**Example**

```sh
curl --request POST \
  --url 'http://localhost/template.php?=' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data pk=5DD25A16A4F2841E6C71BB00109BB51CFA98F5423BA7F1ABC3A5C844C981C3AE \
  --data command=pk2nano
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "wallet": "nano_1qgkdadcbwn65sp95gr144fuc99tm5tn6gx9y8ow9bgaam6r5ixgtx19tw93",
  "public_key": "5DD25A16A4F2841E6C71BB00109BB51CFA98F5423BA7F1ABC3A5C844C981C3AE"
}
```

### COMMAND: seed2key_pair

:warning: WARNING: Sensible data -> Bip39 and private key.

- Description:

Extracts Nano wallet number given a Nano SEED

command|type|required
-------|----|-------|
seed2key_pair|command|yes
seed|Nano SEED|yes
wallet_number|Wallet number|yes
prefix|Public key prefix _xrb__ or _nano__|no

**Example**

```sh
curl --request POST \
  --url 'http://localhost/template.php?=' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data seed=86A4EBE059446FF84F8C4FAC7C56EF97D16DA7369845051414A0A6DA5EB99FCD \
  --data command=seed2key_pair \
  --data wallet_number=171210
```

**Return value**

```sh
{
  "error": "0",
  "reason": "Success",
  "key_pair": {
    "private_key": "1890553EECBF9B6607AB2881C06A5D82BFF16878504AB94FE9B6732356416F1B",
    "public_key": "CC2D7D29B41D2C00D6B09212D4F9D9404100F8F45131270CEF54E878D19AE1B7",
    "wallet_number": "171210",
    "wallet": "nano_3m3fhnnua9be15dd36iktmwxki4315whanbj6w8gyo9ah5asorfq7p561g6i"
  }
}
```

### COMMAND: set_account_to_block

- Description:

Set Nano account to Nano block

command|type|required
-------|----|-------|
set_account_to_block|command|yes
block|Nano Block|yes
account|Nano account or public key|yes

**Example**

```sh
curl --request POST \
  --url http://localhost/chksig.php \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data command=set_account_to_block \
  --data block=0000000000000000000000000000000000000000000000000000000000000006095b645b6c0cccb52dd65218de613ce13cea58a850a80c3f704291b698a50417ae0c84815a6b7449d3df836f5ab6b917c9301103134904457a928c56580cf5a4c798cff4f1131204f65c4d22c3e6316f26f380ee0616aadbabea1268fd75fb050001ed09beae30fbda03614787b00000f45b8087702b867f9736ae82628708e57780b1eb004e123cf2822a5cb935af1700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000070000000000000000 \
  --data account=xrb_19tjx95wwxz13b7km6xyhdomiyynrucw5g1foa7xjmf6d1jf8gg5yh6sngo4
```

**Return value**

```sh
{
  "block": "00000000000000000000000000000000000000000000000000000000000000061f51e9c7ce77e00a4b2993be7aeb387bd4c6d5c1b80daa0bd8cda45822d339c3ae0c84815a6b7449d3df836f5ab6b917c9301103134904457a928c56580cf5a4c798cff4f1131204f65c4d22c3e6316f26f380ee0616aadbabea1268fd75fb050001ed09beae30fbda03614787b00000f45b8087702b867f9736ae82628708e57780b1eb004e123cf2822a5cb935af1700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000070000000000000000"
}
```

In development ...
## License
MIT

