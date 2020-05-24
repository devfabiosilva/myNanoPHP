<h1 align="center">
    MyNanoPHP - A C binding library to integrate Nano Crytocurrency to PHP
</h1>

<p align="center">
	<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/devfabiosilva/myNanoPHP">
	<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/devfabiosilva/myNanoPHP">
	<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/devfabiosilva/myNanoPHP">
	<img alt="GitHub issues" src="https://img.shields.io/github/issues/devfabiosilva/myNanoPHP">
	<img alt="GitHub" src="https://img.shields.io/github/license/devfabiosilva/myNanoPHP">
	<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/devfabiosilva/myNanoPHP">
</p>

# myNanoPHP
myNanoPHP is a C library that integrates Nano Cryptocurrency tools to PHP

## Details

In development ...

## Installing

In Development ...

## Hello World Demo API

## FUNCTIONS

<h1>- php_c_add_sub_balance()</h1>

### Description

Adds or Subtracts two Nano big numbers

```php
$res = php_c_add_sub_balance($valueA, $valueB, $type);
```

Where:

**_$res = $valueA + $valueB_** or **_$res = $valueA - $valueB_**

params|description
------|-----------
**_$valueA_**|A value
**_$valueB_**|B value
**_$type_**| Big numbers types

$type|Type description
-----|----------------
**NANO_ADD_A_B**|Return value is A + B
**NANO_SUB_A_B**|Return value is A - B
**NANO_RES_RAW_128**|Return value is hex string
**NANO_RES_RAW_STRING**|Reurn value is Nano raw string
**NANO_RES_REAL_STRING**|Return value is Nano real string
**NANO_A_RAW_128**|Input value A is a raw hex string
**NANO_A_RAW_STRING**|Input value A is Nano raw string
**NANO_A_REAL_STRING**|Input value A is Nano real string
**NANO_B_RAW_128**|Input value B is a raw hex string
**NANO_B_RAW_STRING**|Input value B is Nano raw string
**NANO_B_REAL_STRING**|Input value B is Nano real string

#### Return value

A real/hex/raw string value of addition/subtraction operation

##### Example 1

Add two real values "1.3" + "2.5" = ?

```sh
php -r "echo php_c_add_sub_balance('1.3', '2.5', NANO_ADD_A_B|NANO_RES_REAL_STRING|NANO_A_REAL_STRING|NANO_B_REAL_STRING);"
```

**Return value**

```sh
3.8 # => 1.3 + 2.5
```

##### Example 2

Subtract one real value "10.31791" minus Nano raw value "3671790000000000000000000000000" and return a real value

```sh
php -r "echo php_c_add_sub_balance('10.31791', '3671790000000000000000000000000', NANO_SUB_A_B|NANO_RES_REAL_STRING|NANO_A_REAL_STRING|NANO_B_RAW_STRING);"
```

**Return value**

```sh
6.64612 # => 10.31791(REAL) - 3671790000000000000000000000000(RAW) = 6.64612(REAL)
# Human readable result 10.31791 - 3.67179 = 6.64612
```

##### Example 3

Add one Nano raw value "6389710900000000000000000000000000" plus Nano hex value "00002363AEAAB97F08117CAFF4200000" and return a Nano raw value

```sh
php -r "echo php_c_add_sub_balance('6389710900000000000000000000000000', '00002363AEAAB97F08117CAFF4200000', NANO_ADD_A_B|NANO_RES_RAW_STRING|NANO_A_RAW_STRING|NANO_B_RAW_128);"
```

**Return value**

```sh
7107492881001800000000000000000000 # => 6389710900000000000000000000000000(RAW) + 00002363AEAAB97F08117CAFF4200000(HEX) = 7107492881001800000000000000000000(RAW)
# Human readable result 6389.7109 + 717.7819810018 = 7107.4928810018
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_bip39_to_nano_seed()</h1>

### Description

Extract Nano SEED from Bip39 menemonic

```php
$res = php_c_bip39_to_nano_seed($bip39, $dictionary_path);
```

params|type|description
------|----|-----------
**_$bip39_**|string|Bip39 mnemonic
**_$dictionary_**|string|Path and file to dictionary file *.dic

#### Return value

Nano SEED in hex string format

##### Example 1

Extract Nano SEED from Bip39 menemonic "_mesh clap laptop idea vocal stadium spoil buyer parent main worry siren scout theme country ridge universe pen cage bless robot seek inner latin_" using English Bip39 dictionary

```sh
php -r "echo php_c_bip39_to_nano_seed('mesh clap laptop idea vocal stadium spoil buyer parent main worry siren scout theme country ridge universe pen cage bless robot seek inner latin', '/var/www/html/dictionary.dic');"
```

**Return value**

```sh
8BC539F4383F55A7F490FBA030CBF764BC15C00C45CCEDD44C808BDBB3861D1B
# => YOUR NANO SEED. Don't tell your SEED and Bip39 menemonic to anyone. Keep it SAFE !
# Expose your SEED or Mnemonic everybody will have access to your funds
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_block_to_p2pow()</h1>

### Description

Converts a Nano binary block to P2PoW binary format adding fee for Proof of Work computation

```php
$res = php_c_block_to_p2pow($block, $worker_wallet, $worker_representative, $worker_fee, $worker_fee_type);
```

params|type|description
------|----|-----------
**_$block_**|binary|Binary Nano Block
**_$worker_wallet_**|string|Worker wallet
**_$worker_representative_**|string|Worker representative. If empty string then function clones user representative to worker representative
**_$worker_fee_**|string|Fee to computate Proof of Work
**_$worker_type_**|integer|(Optional) Fee type. If ommited **fee type** is real string

type|description
----|-----------
**WORKER_FEE_HEX**|Fee value is hex string big number
**WORKER_FEE_REAL**|Fee value is a real string
**WORKER_FEE_RAW**|Fee value is Nano Raw

#### Return value

Binary block to variable

##### Example

Create a file "create_p2pow_block.php" and type:

```php
<?php
//sat May 23 2020 14:50:23 -03 

   /*
    * EXAMPLE: Creates a Nano block and add fee to P2PoW block
    */

   echo "STEP1: Create Nano Block to send 150 Nanos to nano_3mh51ybmmedzp99shs7x6ajfcx87sqpp3mt37ohqtz6hccsxh9ufaf3a1stw\n";

   $account            = 'nano_1ru5kyg89aerkby6fbwndxchk7ksr3de1bafkz1r4k1796pbubjujrypwsdu';
   $previous           = '7F8E7DFE181544848FCC28CD969CC5539816B49CE17FCA03B7006CFADDA5C687';
   $representative     = 'nano_3naq5joid48991pxj95tu9z117bghwk3ndum1o4i85jb6gdkerj9rdj6p816';
   $balance            = '1050.37189';
   $balance_type       = BALANCE_REAL_STRING;
   $value_to_send      = '150';
   $value_to_send_type = VALUE_SEND_RECEIVE_REAL_STRING;
   $destination        = 'nano_3mh51ybmmedzp99shs7x6ajfcx87sqpp3mt37ohqtz6hccsxh9ufaf3a1stw';
   $direction          = VALUE_TO_SEND;

   try {

      $nano_block = php_c_generate_block(

                       $account,
                       $previous,
                       $representative,
                       $balance,
                       $balance_type,
                       $value_to_send,
                       $value_to_send_type,
                       $destination,
                       $direction

                    );

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   echo "SUCCESS: Nano block created. Now adding fee to Nano block ...\n";

   $worker_wallet         = 'nano_3oj16m1u5h3m9buboxynbwndxyksiy4rjet5cy5nj8fhgjw5h7msrhxud3sz';
   $worker_representative = '';              /* if '' then $worker_representative = $representative */
   $worker_fee            = '0.0001';
   $worker_fee_type       = WORKER_FEE_REAL; /* worker fee is represented in real value. It could be ommited in this case (real value)*/

   try {

      $worker_fee_block = php_c_block_to_p2pow(

                       $nano_block,
                       $worker_wallet,
                       $worker_representative,
                       $worker_fee,
                       $worker_fee_type

                    );

   } catch (Exception $e) {

      echo "Error code in 'php_c_block_to_p2pow' ".$e->getCode()."Error message: ".$e->getMessage();
      exit(1);

   }

   echo "SUCCESS\nP2PoW Fee block =>\n";
   echo bin2hex($worker_fee_block);
   echo "\nFinally Hello World\n";

?>
```

```sh
php create_p2pow_block.php
```

**Return value (stored in $worker_fee_block variable)**

```sh
# Binary P2PoW block result representation in Memory (498 Bytes long)

0000000000000000000000000000000000000000000000000000000000000006
6363979c63a198927c46a7945f54f91659c056c0250d97c1814805392c9da63b
7f8e7dfe181544848fcc28cd969cc5539816b49ce17fca03b7006cfadda5c687
d1171c6b0588c7382dd89c7ad9fe00152e7f241a2f730545030e292397266227
00002c644a7b7ee7fb32b5eef2000000
cde3079339b17fb1cf97e4bd2222d574c5cded60cf412d5f7d7c8f52b3d79f6d
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00
0000000000000000
0000000000000000000000000000000000000000000000000000000000000006
6363979c63a198927c46a7945f54f91659c056c0250d97c1814805392c9da63b
5452f287f5c1f8fbd70da606050c851127912f9c86b408e39d557c05177b0c49
d1171c6b0588c7382dd89c7ad9fe00152e7f241a2f730545030e292397266227
00002c644a28c7151e6aa91c0e000000
d62024c1b1bc333a769af7d44f28befa59878588b34357874899af7478379679
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00
0000000000000000

#Human readable result (JSON Equivalent)
{
  "user_transaction": {
    "block_type": "state",
    "account": "nano_1ru5kyg89aerkby6fbwndxchk7ksr3de1bafkz1r4k1796pbubjujrypwsdu",
    "previous": "7F8E7DFE181544848FCC28CD969CC5539816B49CE17FCA03B7006CFADDA5C687",
    "representative": "nano_3naq5joid48991pxj95tu9z117bghwk3ndum1o4i85jb6gdkerj9rdj6p816",
    "balance": "900371890000000000000000000000000",
    "link": "CDE3079339B17FB1CF97E4BD2222D574C5CDED60CF412D5F7D7C8F52B3D79F6D",
    "link_as_account": "nano_3mh51ybmmedzp99shs7x6ajfcx87sqpp3mt37ohqtz6hccsxh9ufaf3a1stw",
    "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  },
  "worker_transaction": {
    "block_type": "state",
    "account": "nano_1ru5kyg89aerkby6fbwndxchk7ksr3de1bafkz1r4k1796pbubjujrypwsdu",
    "previous": "5452F287F5C1F8FBD70DA606050C851127912F9C86B408E39D557C05177B0C49",
    "representative": "nano_3naq5joid48991pxj95tu9z117bghwk3ndum1o4i85jb6gdkerj9rdj6p816",
    "balance": "900371790000000000000000000000000",
    "link": "D62024C1B1BC333A769AF7D44F28BEFA59878588B34357874899AF7478379679",
    "link_as_account": "nano_3oj16m1u5h3m9buboxynbwndxyksiy4rjet5cy5nj8fhgjw5h7msrhxud3sz",
    "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  }
}
# This block is not signed yet. To sign this block see php_c_sign_p2pow_block()
# To parse P2PoW binary block to JSON see php_c_p2pow_to_json()
```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_p2pow_to_json()_
- _php_c_generate_block()_
- _php_c_parse_block_to_json()_
- _php_c_sign_p2pow_block()_
- _php_c_p2pow_to_json()_


<h1>- php_c_brainwallet_generate()</h1>

### Description

Extract a Nano SEED given a phrase or word list and salt

```php
$res = php_c_brainwallet_generate($brainwallet, $salt, $mode, $dictionary_path);
```

params|type|description
------|----|-----------
**_$brainwallet_**|string|Brainwallet text input
**_$salt_**|string|Salt text input
**_$mode_**|integer|Brainwallet mode (see table below) to allow only generate custom Nano SEED anti-crack strength
**_$dictionary_path_**|string|Path and filename to dictionary file *.dic

**_$mode_** type|description
----------------|-----------
**BRAIN_WALLET_VERY_POOR**|Allows generate a very poor Brainwallet (Crack within seconds or less)
**BRAIN_WALLET_POOR**|Allows generate a poor Brainwallet (Crack within minutes)
**BRAIN_WALLET_VERY_BAD**|Allows generate a very bad Brainwallet (Crack within one hours)
**BRAIN_WALLET_BAD**|Allows generate a bad Brainwallet (Crack within one day)
**BRAIN_WALLET_VERY_WEAK**|Allows generate a very weak Brainwallet (Crack within one week)
**BRAIN_WALLET_WEAK**|Allows generate a weak Brainwallet (Crack within one year)
**BRAIN_WALLET_STILL_WEAK**|Allows generate a still weak Brainwallet (Crack within one month)
**BRAIN_WALLET_MAYBE_GOOD**|Allows generate a maybe good for you Brainwallet (Crack within one century)
**BRAIN_WALLET_GOOD**|Allows generate a good Brainwallet (Crack within one thousand year)
**BRAIN_WALLET_VERY_GOOD**|Allows generate a very good Brainwallet (Crack within ten thousand year)
**BRAIN_WALLET_NICE**|Allows generate a very nice Brainwallet (Crack withing one hundred thousand year)
**BRAIN_WALLET_PERFECT**|Allows generate a perfect Brainwallet (3.34x10^53 Years to crack)

#### Return value

Bip39 and Nano SEED extracted from your Brainwallet and Salt in JSON string format

##### Example

```sh
php -r "echo php_c_brainwallet_generate('The state is that great fiction by which everyone tries to live at the expense of everyone else (Fréderic Bastiat 1801-1850)', 'youremail@example.com+phoneNumber:01234567890+AnyOtherTextHere', BRAIN_WALLET_PERFECT,'/var/www/html/dictionary.dic');"
```

**Return value**

```sh
{
    "result": {
      "seed": "D59BF169DECEF50CE2A61E4850F0D284DD2C7621DE913F214610B14F0FC23522",
      "bip39": "stereo test foil rural urban major melody sense embark maple cruise answer spot deposit manual split dish any loud glad valley three stand fork"
    },
    "warning_msg": "[Perfect!] 3.34x10^53 Years to crack"
}
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_calculate_work_from_block()</h1>

### Description

Calculates a Proof of Work of a Nano Block

```php
php_c_calculate_work_from_block($block, $number_of_threads, $threshold);
```

params|type|description
------|----|-----------
**_$block_**|binary|Input Nano block
**_$number_of_threads_**|integer|Number of CPU threads
**_$threshold_**|string|(Optional) Threshold value. If ommited then _DEFAULT_NANO_POW_THRESHOLD = 0xffffffc000000000_ is used

#### Return value

Binary Nano block with calculated Proof of Work with a custom/default threshold

##### Example

Create a file "calculate_pow_in_nano_block.php" and type:

```php
<?php
//sat May 23 2020 18:51:17 -03

   /*
    * EXAMPLE: Prepares a block to receive funds and calculates Proof of Work
    * to be stored in Nano Blockchain
    */

   echo "STEP1: Create Nano Block to receive (open block) 368.182918 Nanos from nano_3js4zced6abrzy9wiy3q3ozsicszpnfm7oszumrbd9k4yirkhm977n8hbuxy\n";

   $account            = 'nano_1ru5kyg89aerkby6fbwndxchk7ksr3de1bafkz1r4k1796pbubjujrypwsdu';
   $previous           = '7F8E7DFE181544848FCC28CD969CC5539816B49CE17FCA03B7006CFADDA5C687';
   $representative     = 'nano_3naq5joid48991pxj95tu9z117bghwk3ndum1o4i85jb6gdkerj9rdj6p816';
   $balance            = '0.179';
   $balance_type       = BALANCE_REAL_STRING;
   $value_to_send      = '368.182918';
   $value_to_send_type = VALUE_SEND_RECEIVE_REAL_STRING;
   $destination        = 'nano_3js4zced6abrzy9wiy3q3ozsicszpnfm7oszumrbd9k4yirkhm977n8hbuxy';
   $direction          = VALUE_TO_RECEIVE;

   try {

      $nano_block = php_c_generate_block(

                       $account,
                       $previous,
                       $representative,
                       $balance,
                       $balance_type,
                       $value_to_send,
                       $value_to_send_type,
                       $destination,
                       $direction

                    );

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   echo "SUCCESS: Nano block created. Now calculating a Proof of Work. It can take a little longer depending your CPU threads and hardware resources ...\n";
   echo "Using default threshold = ".DEFAULT_NANO_POW_THRESHOLD."\n";

   $number_of_threads = 4; // 4 Threads !!

   try {

      php_c_calculate_work_from_block($nano_block, $number_of_threads);

   } catch (Exception $e) {

      echo "Error code in 'php_c_calculate_work_from_block' ".$e->getCode()."Error message: ".$e->getMessage();
      exit(1);

   }

   echo "SUCCESS\nNano block with calculated Proof of Work =>\n";
   echo bin2hex($nano_block);
   echo "\nFinally Hello World\n";
```

```sh
php calculate_pow_in_nano_block.php
```

**Return value (stored in $nano_block variable)**

```sh

# Binary Nano block result representation in Memory (249 Bytes long)
0000000000000000000000000000000000000000000000000000000000000006
6363979c63a198927c46a7945f54f91659c056c0250d97c1814805392c9da63b
7f8e7dfe181544848fcc28cd969cc5539816b49ce17fca03b7006cfadda5c687
d1171c6b0588c7382dd89c7ad9fe00152e7f241a2f730545030e292397266227
00001229618cf8f25cadb2be7e000000
c722fa98b22138ff8fc878370d7f982b3fb51b32d73fdcf0959e42f43127cce5
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00
637cf3efc220fa4c

#Human readable result (JSON Equivalent)
{
  "action": "process",
  "json_block": "true",
  "block": {
    "type": "state",
    "account": "nano_1ru5kyg89aerkby6fbwndxchk7ksr3de1bafkz1r4k1796pbubjujrypwsdu",
    "previous": "7F8E7DFE181544848FCC28CD969CC5539816B49CE17FCA03B7006CFADDA5C687",
    "representative": "nano_3naq5joid48991pxj95tu9z117bghwk3ndum1o4i85jb6gdkerj9rdj6p816",
    "balance": "368361918000000000000000000000000",
    "link": "C722FA98B22138FF8FC878370D7F982B3FB51B32D73FDCF0959E42F43127CCE5",
    "link_as_account": "nano_3js4zced6abrzy9wiy3q3ozsicszpnfm7oszumrbd9k4yirkhm977n8hbuxy",
    "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "work": "4CFA20C2EFF37C63"
  }
}
# This block is not signed yet. To sign this block see php_c_sign_block()
# To parse Nano binary block to JSON see php_c_parse_block_to_json()
```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_sign_block()_
- _php_c_parse_block_to_json()_

<h1>- php_c_compare()</h1>

### Description

Compares two Nano big numbers values

```php
php_c_compare($valueA, $valueB, $type, $compare);
```

params|type|description
------|----|-----------
**_$valueA_**|string|Input Nano value A
**_$valueB_**|string|Input Nano value B
**_$type_**|integer|Input big numbers type
**_$compare_**|integer|Nano Big number condition

**_$type_** type|description
----------------|-----------
**NANO_A_REAL_STRING**|Input value A _$valueA_ is real value
**NANO_A_RAW_STRING**|Input value A _$valueA_ is Nano raw string
**NANO_A_RAW_128**|Input vallue A _$valueA_ is Raw big number
**NANO_B_REAL_STRING**|Input value B _$valueB_ is real value
**NANO_B_RAW_STRING**|Input value B _$valueB_ is Nano raw string
**NANO_B_RAW_128**|Input value B _$valueB_ is Raw big number

**_$compare_** type|description
-------------------|-----------
**NANO_COMPARE_EQ**|Value A _$valueA_ is EQUAL Value B _$valueB_
**NANO_COMPARE_LT**|Value A _$valueA_ is LESSER THAN Value B _$valueB_
**NANO_COMPARE_LEQ**|Value A _$valueA_ is LESSER THAN OR EQUAL Value B _$valueB_
**NANO_COMPARE_GT**|Value A _$valueA_ is GREATER THAN Value B _$valueB_
**NANO_COMPARE_GEQ**|Value A _$valueA_ is GREATER THAN OR EQUAL Value B _$valueB_

#### Return value

Rerurns **true** if condition _comapare_ satisfies expression else returns **false**

##### Examples

```sh
php -r "echo (php_c_compare('2.1', '3', NANO_A_REAL_STRING|NANO_B_REAL_STRING, NANO_COMPARE_GT))?'TRUE':'FALSE';"
# 2.1 > 3 RETURNS FALSE
```

```sh
php -r "echo (php_c_compare('72', '3', NANO_A_REAL_STRING|NANO_B_REAL_STRING, NANO_COMPARE_GT))?'TRUE':'FALSE';"
# 72 > 3 RETURNS TRUE
```

```sh
php -r "echo (php_c_compare('5.9', '791789901910919928837771776677', NANO_A_REAL_STRING|NANO_B_RAW_STRING, NANO_COMPARE_LEQ))?'TRUE':'FALSE';"
# 5.9(REAL) > 791789901910919928837771776677(RAW) RETURNS FALSE
# Human readable result
# 5.9 <= 0.791789901910919928837771776677 RETURNS FALSE
```

```sh
php -r "echo (php_c_compare('30298174000000000000000000000000', '0000017E6AAE20E930F871DCFE000000', NANO_A_RAW_STRING|NANO_B_RAW_128, NANO_COMPARE_EQ))?'TRUE':'FALSE';"
# 30298174000000000000000000000000(RAW) == 0000017E6AAE20E930F871DCFE000000(HEX) RETURNS TRUE
# Human readable result
# 30.298174 == 30.298174 RETURNS TRUE
```
**On error**

Throws _MyNanoCEmbeddedException_

## SUMMARY: Constants, Functions and Classes

### In console type:

```sh
php --re mynanoembedded
```

### **Result**

```sh
Extension [ <persistent> extension #15 mynanoembedded version 1.0 ] {

  - Constants [64] {
    Constant [ string DEFAULT_NANO_POW_THRESHOLD ] { 0xffffffc000000000 }
    Constant [ string NANO_PREFIX ] { nano_ }
    Constant [ string XRB_PREFIX ] { xrb_ }
    Constant [ integer REAL_TO_RAW ] { 256 }
    Constant [ integer RAW_TO_REAL ] { 2 }
    Constant [ integer REAL_TO_HEX ] { 512 }
    Constant [ integer HEX_TO_REAL ] { 1024 }
    Constant [ integer RAW_TO_HEX ] { 2048 }
    Constant [ integer HEX_TO_RAW ] { 4096 }
    Constant [ integer ENTROPY_TYPE_PARANOIC ] { 1477682819 }
    Constant [ integer ENTROPY_TYPE_EXCELENT ] { 1476885281 }
    Constant [ integer ENTROPY_TYPE_GOOD ] { 1472531015 }
    Constant [ integer ENTROPY_TYPE_NOT_ENOUGH ] { 1471001808 }
    Constant [ integer ENTROPY_TYPE_NOT_RECOMENDED ] { 1470003345 }
    Constant [ integer NANO_ADD_A_B ] { 1 }
    Constant [ integer NANO_SUB_A_B ] { 2 }
    Constant [ integer NANO_RES_RAW_128 ] { 256 }
    Constant [ integer NANO_RES_RAW_STRING ] { 512 }
    Constant [ integer NANO_RES_REAL_STRING ] { 1024 }
    Constant [ integer NANO_A_RAW_128 ] { 4 }
    Constant [ integer NANO_A_RAW_STRING ] { 8 }
    Constant [ integer NANO_A_REAL_STRING ] { 16 }
    Constant [ integer NANO_B_RAW_128 ] { 32 }
    Constant [ integer NANO_B_RAW_STRING ] { 64 }
    Constant [ integer NANO_B_REAL_STRING ] { 128 }
    Constant [ integer NANO_COMPARE_EQ ] { 65536 }
    Constant [ integer NANO_COMPARE_LT ] { 131072 }
    Constant [ integer NANO_COMPARE_LEQ ] { 196608 }
    Constant [ integer NANO_COMPARE_GT ] { 262144 }
    Constant [ integer NANO_COMPARE_GEQ ] { 327680 }
    Constant [ integer BRAIN_WALLET_VERY_POOR  ] { 0 }
    Constant [ integer BRAIN_WALLET_POOR ] { 1 }
    Constant [ integer BRAIN_WALLET_VERY_BAD ] { 2 }
    Constant [ integer BRAIN_WALLET_BAD ] { 3 }
    Constant [ integer BRAIN_WALLET_VERY_WEAK ] { 4 }
    Constant [ integer BRAIN_WALLET_WEAK ] { 5 }
    Constant [ integer BRAIN_WALLET_STILL_WEAK ] { 6 }
    Constant [ integer BRAIN_WALLET_MAYBE_GOOD ] { 7 }
    Constant [ integer BRAIN_WALLET_GOOD ] { 8 }
    Constant [ integer BRAIN_WALLET_VERY_GOOD ] { 9 }
    Constant [ integer BRAIN_WALLET_NICE ] { 10 }
    Constant [ integer BRAIN_WALLET_PERFECT ] { 11 }
    Constant [ integer VALUE_TO_SEND ] { 1 }
    Constant [ integer VALUE_TO_RECEIVE ] { 2 }
    Constant [ integer BALANCE_RAW_128 ] { 4 }
    Constant [ integer BALANCE_REAL_STRING ] { 16 }
    Constant [ integer BALANCE_RAW_STRING ] { 8 }
    Constant [ integer VALUE_SEND_RECEIVE_RAW_128 ] { 32 }
    Constant [ integer VALUE_SEND_RECEIVE_REAL_STRING ] { 128 }
    Constant [ integer VALUE_SEND_RECEIVE_RAW_STRING ] { 64 }
    Constant [ integer REP_XRB ] { 4 }
    Constant [ integer SENDER_XRB ] { 2 }
    Constant [ integer DEST_XRB ] { 1 }
    Constant [ integer WORKER_FEE_HEX ] { 32 }
    Constant [ integer WORKER_FEE_REAL ] { 128 }
    Constant [ integer WORKER_FEE_RAW ] { 64 }
    Constant [ integer PASS_MUST_HAVE_AT_LEAST_NONE ] { 0 }
    Constant [ integer PASS_MUST_HAVE_AT_LEAST_ONE_NUMBER ] { 1 }
    Constant [ integer PASS_MUST_HAVE_AT_LEAST_ONE_SYMBOL ] { 2 }
    Constant [ integer PASS_MUST_HAVE_AT_LEAST_ONE_UPPER_CASE ] { 4 }
    Constant [ integer PASS_MUST_HAVE_AT_LEAST_ONE_LOWER_CASE ] { 8 }
    Constant [ integer PASS_IS_OUT_OVF ] { 1024 }
    Constant [ integer PASS_IS_TOO_SHORT ] { 512 }
    Constant [ integer PASS_IS_TOO_LONG ] { 256 }
  }

  - Functions {
    Function [ <internal:mynanoembedded> function php_c_nano_check_sig ] {

      - Parameters [3] {
        Parameter #0 [ <required> $signature ]
        Parameter #1 [ <required> $message ]
        Parameter #2 [ <required> $nano_pk ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_nano_proof_of_work ] {

      - Parameters [3] {
        Parameter #0 [ <required> $hash ]
        Parameter #1 [ <required> $n_thr ]
        Parameter #2 [ <optional> $threshold ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_nano_verify_work ] {

      - Parameters [3] {
        Parameter #0 [ <required> $hash ]
        Parameter #1 [ <required> $work ]
        Parameter #2 [ <optional> $threshold ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_nano_wallet_to_public_key ] {

      - Parameters [1] {
        Parameter #0 [ <required> $Nano ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_public_key_to_nano_wallet ] {

      - Parameters [2] {
        Parameter #0 [ <required> $public_key ]
        Parameter #1 [ <optional> $nano_prefix ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_convert_balance ] {

      - Parameters [2] {
        Parameter #0 [ <required> $balance ]
        Parameter #1 [ <required> $type ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_generate_seed ] {

      - Parameters [1] {
        Parameter #0 [ <required> $entropy ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_get_entropy_name ] {

      - Parameters [1] {
        Parameter #0 [ <required> $entropy ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_nano_seed_to_bip39 ] {

      - Parameters [2] {
        Parameter #0 [ <required> $seed ]
        Parameter #1 [ <required> $dictionary_path ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_bip39_to_nano_seed ] {

      - Parameters [2] {
        Parameter #0 [ <required> $bip39 ]
        Parameter #1 [ <required> $dictionary_path ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_seed_to_nano_key_pair ] {

      - Parameters [3] {
        Parameter #0 [ <required> $seed ]
        Parameter #1 [ <required> $wallet_number ]
        Parameter #2 [ <optional> $prefix ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_add_sub_balance ] {

      - Parameters [3] {
        Parameter #0 [ <required> $valueA ]
        Parameter #1 [ <required> $valueB ]
        Parameter #2 [ <required> $type ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_compare ] {

      - Parameters [4] {
        Parameter #0 [ <required> $valueA ]
        Parameter #1 [ <required> $valueB ]
        Parameter #2 [ <required> $type ]
        Parameter #3 [ <required> $compare ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_brainwallet_generate ] {

      - Parameters [4] {
        Parameter #0 [ <required> $brainwallet ]
        Parameter #1 [ <required> $salt ]
        Parameter #2 [ <required> $mode ]
        Parameter #3 [ <optional> $dictionary_path ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_generate_token ] {

      - Parameters [2] {
        Parameter #0 [ <required> $data ]
        Parameter #1 [ <required> $password ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_verify_token ] {

      - Parameters [3] {
        Parameter #0 [ <required> $token ]
        Parameter #1 [ <required> $data ]
        Parameter #2 [ <required> $password ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_license ] {

      - Parameters [0] {
      }
    }
    Function [ <internal:mynanoembedded> function php_c_library_info ] {

      - Parameters [0] {
      }
    }
    Function [ <internal:mynanoembedded> function php_c_to_multiplier ] {

      - Parameters [2] {
        Parameter #0 [ <required> $difficulty ]
        Parameter #1 [ <required> $base_difficulty ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_from_multiplier ] {

      - Parameters [2] {
        Parameter #0 [ <required> $multiplier ]
        Parameter #1 [ <required> $base_difficulty ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_generate_block ] {

      - Parameters [9] {
        Parameter #0 [ <required> $account ]
        Parameter #1 [ <required> $previous ]
        Parameter #2 [ <required> $representative ]
        Parameter #3 [ <required> $balance ]
        Parameter #4 [ <required> $balance_type ]
        Parameter #5 [ <required> $val_send_rec ]
        Parameter #6 [ <required> $val_send_rec_type ]
        Parameter #7 [ <required> $link ]
        Parameter #8 [ <required> $direction ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_sign_block ] {

      - Parameters [3] {
        Parameter #0 [ <required> $user_block ]
        Parameter #1 [ <required> $fee_block ]
        Parameter #2 [ <required> $private_key ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_get_account_from_block ] {

      - Parameters [3] {
        Parameter #0 [ <required> $block ]
        Parameter #1 [ <optional> $type ]
        Parameter #2 [ <optional> $prefix ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_get_representative_from_block ] {

      - Parameters [3] {
        Parameter #0 [ <required> $block ]
        Parameter #1 [ <optional> $type ]
        Parameter #2 [ <optional> $prefix ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_get_link_from_block ] {

      - Parameters [3] {
        Parameter #0 [ <required> $block ]
        Parameter #1 [ <optional> $type ]
        Parameter #2 [ <optional> $prefix ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_get_previous_from_block ] {

      - Parameters [1] {
        Parameter #0 [ <required> $block ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_get_balance_from_block ] {

      - Parameters [2] {
        Parameter #0 [ <required> $block ]
        Parameter #1 [ <optional> $balance_type ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_get_signature_from_block ] {

      - Parameters [1] {
        Parameter #0 [ <required> $block ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_get_prefixes_from_block ] {

      - Parameters [1] {
        Parameter #0 [ <required> $block ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_get_work_from_block ] {

      - Parameters [1] {
        Parameter #0 [ <required> $block ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_set_account_to_block ] {

      - Parameters [2] {
        Parameter #0 [ <required> &$block ]
        Parameter #1 [ <required> $wallet ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_set_representative_to_block ] {

      - Parameters [2] {
        Parameter #0 [ <required> &$block ]
        Parameter #1 [ <required> $representative ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_set_link_to_block ] {

      - Parameters [2] {
        Parameter #0 [ <required> &$block ]
        Parameter #1 [ <required> $link ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_set_previous ] {

      - Parameters [2] {
        Parameter #0 [ <required> &$block ]
        Parameter #1 [ <optional> $previous ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_set_balance ] {

      - Parameters [3] {
        Parameter #0 [ <required> &$block ]
        Parameter #1 [ <required> $balance ]
        Parameter #2 [ <required> $balance_type ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_set_signature ] {

      - Parameters [2] {
        Parameter #0 [ <required> &$block ]
        Parameter #1 [ <required> $signature ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_set_prefixes ] {

      - Parameters [2] {
        Parameter #0 [ <required> &$block ]
        Parameter #1 [ <required> $signature ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_set_work ] {

      - Parameters [2] {
        Parameter #0 [ <required> &$block ]
        Parameter #1 [ <required> $signature ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_calculate_work_from_block ] {

      - Parameters [3] {
        Parameter #0 [ <required> &$block ]
        Parameter #1 [ <required> $number_of_threads ]
        Parameter #2 [ <optional> $threshold ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_parse_block_to_json ] {

      - Parameters [1] {
        Parameter #0 [ <required> $block ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_get_block_hash ] {

      - Parameters [1] {
        Parameter #0 [ <required> $block ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_block_to_p2pow ] {

      - Parameters [5] {
        Parameter #0 [ <required> $block ]
        Parameter #1 [ <required> $worker_wallet ]
        Parameter #2 [ <required> $worker_representative ]
        Parameter #3 [ <required> $worker_fee ]
        Parameter #4 [ <optional> $worker_fee_type ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_p2pow_to_json ] {

      - Parameters [1] {
        Parameter #0 [ <required> $block ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_sign_p2pow_block ] {

      - Parameters [2] {
        Parameter #0 [ <required> &$p2pow_block ]
        Parameter #1 [ <required> $private_key ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_get_difficulty ] {

      - Parameters [3] {
        Parameter #0 [ <required> $hash ]
        Parameter #1 [ <required> $work ]
        Parameter #2 [ <optional> $threshold ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_gen_seed_to_encrypted_stream ] {

      - Parameters [5] {
        Parameter #0 [ <required> $entropy ]
        Parameter #1 [ <required> $password ]
        Parameter #2 [ <required> $password_min_len ]
        Parameter #3 [ <required> $password_max_len ]
        Parameter #4 [ <optional> $password_type ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_gen_encrypted_stream_to_seed ] {

      - Parameters [2] {
        Parameter #0 [ <required> $encrypted_stream ]
        Parameter #1 [ <required> $password ]
      }
    }
  }

  - Classes [1] {
    Class [ <internal:mynanoembedded> class MyNanoCEmbeddedException extends Exception implements Throwable ] {

      - Constants [0] {
      }

      - Static properties [0] {
      }

      - Static methods [0] {
      }

      - Properties [4] {
        Property [ <default> protected $message ]
        Property [ <default> protected $code ]
        Property [ <default> protected $file ]
        Property [ <default> protected $line ]
      }

      - Methods [10] {
        Method [ <internal:Core, inherits Exception, ctor> public method __construct ] {

          - Parameters [3] {
            Parameter #0 [ <optional> $message ]
            Parameter #1 [ <optional> $code ]
            Parameter #2 [ <optional> $previous ]
          }
        }

        Method [ <internal:Core, inherits Exception> public method __wakeup ] {
        }

        Method [ <internal:Core, inherits Exception, prototype Throwable> final public method getMessage ] {
        }

        Method [ <internal:Core, inherits Exception, prototype Throwable> final public method getCode ] {
        }

        Method [ <internal:Core, inherits Exception, prototype Throwable> final public method getFile ] {
        }

        Method [ <internal:Core, inherits Exception, prototype Throwable> final public method getLine ] {
        }

        Method [ <internal:Core, inherits Exception, prototype Throwable> final public method getTrace ] {
        }

        Method [ <internal:Core, inherits Exception, prototype Throwable> final public method getPrevious ] {
        }

        Method [ <internal:Core, inherits Exception, prototype Throwable> final public method getTraceAsString ] {
        }

        Method [ <internal:Core, inherits Exception, prototype Throwable> public method __toString ] {
        }
      }
    }
  }
}

```

## LICENSE
MIT

