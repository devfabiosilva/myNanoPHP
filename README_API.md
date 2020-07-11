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

### COMMAND: php_c_block_to_p2pow

- Description:

Creates a P2PoW block given a Nano block and Fee amount and Worker Wallet

command|type|required
-------|----|-------|
php_c_block_to_p2pow|command|yes
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

In development ...
## License
MIT

