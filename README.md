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

   $account               = 'nano_1ru5kyg89aerkby6fbwndxchk7ksr3de1bafkz1r4k1796pbubjujrypwsdu';
   $previous              = '7F8E7DFE181544848FCC28CD969CC5539816B49CE17FCA03B7006CFADDA5C687';
   $representative        = 'nano_3naq5joid48991pxj95tu9z117bghwk3ndum1o4i85jb6gdkerj9rdj6p816';
   $balance               = '0.179';
   $balance_type          = BALANCE_REAL_STRING;
   $value_to_receive      = '368.182918';
   $value_to_receive_type = VALUE_SEND_RECEIVE_REAL_STRING;
   $link                  = '91FFEBD15E445364AC1BCB4751705A80C7B809B7F02F841F34F33429A4F4A7CC';
   $direction             = VALUE_TO_RECEIVE;

   try {

      $nano_block = php_c_generate_block(

                       $account,
                       $previous,
                       $representative,
                       $balance,
                       $balance_type,
                       $value_to_receive,
                       $value_to_receive_type,
                       $link,
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
91ffebd15e445364ac1bcb4751705a80c7b809b7f02f841f34f33429a4f4a7cc
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00
4ad6c2753a3886b1

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
    "link": "91FFEBD15E445364AC1BCB4751705A80C7B809B7F02F841F34F33429A4F4A7CC",
    "link_as_account": "nano_36hzxhaowj4mekp3qkt9c7r7o189q16uhw3hiihmbwsn78khbbyeyygafis4",
    "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "work": "B186383A75C2D64A"
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
# 5.9(REAL) <= 791789901910919928837771776677(RAW) RETURNS FALSE
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

<h1>- php_c_convert_balance()</h1>

### Description

Converts one Nano balance to another

```php
php_c_convert_balance($balance, $type);
```

params|type|description
------|----|-----------
**_$balance_**|string|Input Nano balance
**_$type_**|integer|type of the balance

**_$type_** type|description
----------------|-----------
**REAL_TO_RAW**|Converts a real value to raw value
**RAW_TO_REAL**|Converts a raw value to real value
**REAL_TO_HEX**|Converts real value to hex value
**HEX_TO_REAL**|Converts hex value to real value
**RAW_TO_HEX**|Converts a raw value to hex value
**HEX_TO_RAW**|Converts a hex value to raw value

#### Return value

Rerurns a string with converted value

##### Examples

```sh
php -r "echo php_c_convert_balance('3.6791098001', REAL_TO_RAW);"
# RETURNS 3679109800100000000000000000000(RAW)
```

```sh
php -r "echo php_c_convert_balance('102986792098301000000000000000000', RAW_TO_REAL);"
# RETURNS 102.986792098301(REAL)
```

```sh
php -r "echo php_c_convert_balance('102387.1871001928376', REAL_TO_HEX);"
# RETURNS 0013b813fc4f1e74792ef7068f300000(HEX)
```

```sh
php -r "echo php_c_convert_balance('00231b73b099bd5f7da44a8163040000', HEX_TO_REAL);"
# RETURNS 182287.181001928370216(REAL)
```

```sh
php -r "echo php_c_convert_balance('198282281933192837221600000000000000', RAW_TO_HEX);"
# RETURNS 002630123F23E91C00F3147CD12E0000(HEX)
```

```sh
php -r "echo php_c_convert_balance('08d7b616e531cbcf6cd3657e5ba7634a', HEX_TO_RAW);"
# RETURNS 11753861003364021922160004983677215562(RAW)
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_from_multiplier()</h1>

### Description

Takes a multiplier and converts to Nano Proof of Work difficulty

```php
php_c_from_multiplier($multiplier, $base_difficulty);
```

params|type|description
------|----|-----------
**_$multiplier_**|double|Double value of the multiplier
**_$base_difficulty_**|string|String value in Hex or Octal or Decimal value

#### Return value

Rerurns a hex string value

##### Examples

```sh
php -r "echo php_c_from_multiplier(4, DEFAULT_NANO_POW_THRESHOLD);"
# RETURNS 0xfffffff000000000
```

```sh
php -r "echo php_c_from_multiplier(5.671, '0xfffff10000000000');"
# RETURNS 0xfffffd5adee9340d
```

```sh
php -r "echo php_c_from_multiplier(3.23, '0612791712736716625');"
# RETURNS 0xb0be377ad92a0800
# 0612791882736716625 // Octal value
```

```sh
php -r "echo php_c_from_multiplier(4.891, '8212791982736716625');"
# RETURNS 0xe2f648e16fa3c600
# 8212791982736716625 // Decimal value
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_gen_encrypted_stream_to_seed()</h1>

### Description

Takes a encrypted stream and extract a Nano SEED given a password

```php
php_c_gen_encrypted_stream_to_seed($encrypted_stream, $password, $dictionary_file);
```
params|type|description
------|----|-----------
**_$encrypted_stream_**|binary|Encrypted binary block that stores one Nano SEED
**_$password_**|string|Password to decrypt block and extract the Nano SEED
**_$dictionary_file_**|string|File and path of dictionary file *.dic

#### Return value

Rerurns a hex string with Nano SEED

##### Example

Assuming **dictionary file** is located in '/var/www/html/dictionary.dic' create a file _decrypt_block.php_ and type:

```php
<?php
//sun May 24 2020 22:52 -03

   /*
    * EXAMPLE: Creates an encrypted block containing a generated random Nano SEED
    * and extracts its Nano SEED and Bip39
    */

   echo "STEP1: Creates a Nano SEED with a highest entropy level with password '%1kmLaP,xKwI8)17&&61b>ç~1'\n";


   $entropy          = ENTROPY_TYPE_PARANOIC; // Highest security level. Very slow but the best safest way to generate your random Nano SEED
   $password         = '%1\kmLaP,/xKwI8)17&&61b>ç|hy[~1'; // Ohhhh. What a strong password !!!
   $password_min_len = 15; // Minimum acceptable length of the password
   $password_max_len = 64; // Maximum acceptable length of the password
   $password_type    = PASS_MUST_HAVE_AT_LEAST_ONE_NUMBER|PASS_MUST_HAVE_AT_LEAST_ONE_SYMBOL| // Recommended password requirements
                       PASS_MUST_HAVE_AT_LEAST_ONE_UPPER_CASE|PASS_MUST_HAVE_AT_LEAST_ONE_LOWER_CASE;

   echo "Generating a Nano SEED and encrypting in a non deterministic key with password '".$password."'.\nIt can take a little longer\n";
   echo "Move the mouse, open programs to increase entropy to generate the Nano SEED...\n";

   try {

      $encrypted_nano_seed = php_c_gen_seed_to_encrypted_stream(

                       $entropy,
                       $password,
                       $password_min_len,
                       $password_max_len,
                       $password_type

                    );

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   echo "SUCCESS: Nano SEED generated successfully. Now decrypting and extracting with password '".$password."'...\n";
   echo "STEP 2:\n";

   $dictionary_path = '/var/www/html/dictionary.dic'; // Path to dictionary

   try {

      $encrypted_nano_seed = php_c_gen_encrypted_stream_to_seed($encrypted_nano_seed, $password, $dictionary_path);

   } catch (Exception $e) {

      echo "Error code in 'php_c_gen_encrypted_stream_to_seed' ".$e->getCode()." Error message: ".$e->getMessage();
      exit(1);

   }

   echo "SUCCESS\nUnencrypted Nano SEED =>\n";
   echo $encrypted_nano_seed;
   echo "\nFinally Hello World\n";

?>
```

```sh
php decrypt_block.php
```

```sh
# Encrypted NANO SEED in memory in binary block (352 Bytes long)
# ----------------------------------------------------------------
# 5f6e616e6f77616c6c657466696c655f000001004e414e4f205365656420456e
# 637279707465642066696c652f73747265616d2e204b65657020697420736166
# 6520616e64206261636b75702069742e20546869732066696c65206973207072
# 6f7465637465642062792070617373776f72642e2042555920424954434f494e
# 20616e64204e414e4f2021212100e0e1f2aeef6b77d3ba76f6bd477b47fe7681
# a3d9094badddcb5d19560fa20d8dbc925b57b5f4d804a663bad48557cc451827
# 5f0106690ad8a88c04bd2848c4cb2df0819cbc094566b0f9fbeb3f34a2ada355
# 006df20a2c5f79af9b5ef420d1af961d1905b086a91e58cc9ce4dc88ebdcc0e3
# 91154acd33b1afe2592216ce2526c4dd1a1aa798e94c614f5f9fdb6bbadea470
# 88565665cccdcf566c5027dac81407bff193599bcaf24633145f8aaa02c12020
# 75a6a940999d98b5a15c2e12303519b9709e6b718f6683d9dc4e98e0bba67bfa

# RETURNS
STEP1: Creates a Nano SEED with a highest entropy level with password '%1kmLaP,xKwI8)17&&61b>ç~1'
Generating a Nano SEED and encrypting in a non deterministic key with password '%1\kmLaP,/xKwI8)17&&61b>ç|hy[~1'.
It can take a little longer
Move the mouse, open programs to increase entropy to generate the Nano SEED...
SUCCESS: Nano SEED generated successfully. Now decrypting and extracting with password '%1\kmLaP,/xKwI8)17&&61b>ç|hy[~1'...
STEP 2:

SUCCESS
Unencrypted Nano SEED =>
{

   "seed":"BDFBD45F2EA1F82E972FF7548A7C8B5CEBDE7CB1C04ADD5265DD94B1CA58B459",
   "bip39":"sadness team blind front buzz blanket frequent year fee fault carpet right sadness dinner shove announce tail nasty jazz city bronze clump sphere dish"

}
Finally Hello World

```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_gen_seed_to_encrypted_stream()_


<h1>- php_c_gen_seed_to_encrypted_stream()</h1>

### Description

This function has two functionalities

- Creates a Nano SEED using TRNG Hardware (if available) or PRNG with desired entropy level and encrypt Nano SEED with a given formatted password with non deterministic cryptography
- Save your NANO SEED and encrypt with a given formatted password with non deterministic cryptography

```php
$res = php_c_gen_seed_to_encrypted_stream($entropy, $password, $password_min_len, $password_max_len, $password_type);
```

params|type|description
------|----|-----------
**_$entropy_**|integer or string|Entropy type (see below) or your NANO SEED
**_$password_**|string|Password to encrypt the random generated Nano SEED
**_$password_min_len_**|integer|Minimum allowed password length
**_$password_max_len_**|integer|Maximum allowed password length
**_$password_type_**|integer|Password allowed type (see below)

**_$entropy_** type|description
-------------------|-----------
**ENTROPY_TYPE_PARANOIC**|Paranoic entropy type. Very slow. Strongly recommended to create SEED's
**ENTROPY_TYPE_EXCELENT**|Excelent entropy tyoe. Slow. Recommended to create SEED's
**ENTROPY_TYPE_GOOD**|Good entropy type. Normal. Standard type to create SEED's
**ENTROPY_TYPE_NOT_ENOUGH**|Not enough. Fast. Not recommended for creating SEED's
**ENTROPY_TYPE_NOT_RECOMENDED**|Not recommended. Very fast. Try not to use this option. Recommended only to generate temporary SEED's

**_$password_type_** type|description
-------------------------|-----------
**PASS_MUST_HAVE_AT_LEAST_NONE**|Password don't need any special characters
**PASS_MUST_HAVE_AT_LEAST_ONE_NUMBER**|Password must have at least one number
**PASS_MUST_HAVE_AT_LEAST_ONE_SYMBOL**|Password must have at least one symbol
**PASS_MUST_HAVE_AT_LEAST_ONE_UPPER_CASE**|Password must have at least one upper case
**PASS_MUST_HAVE_AT_LEAST_ONE_LOWER_CASE**|Password must have at least one lower case

#### Return value

Encrypted block of Nano SEED in memory

##### Example 1 (Generating and encrypting NANO Seed in block);

Create a file _encrypt_block.php_ and type:

```php
<?php
//sun May 24 2020 22:52 -03

   /*
    * EXAMPLE: Creates an encrypted block in memory containing a generated random Nano SEED
    */

   echo "Creates a Nano SEED with a highest entropy level with password '%1kmLaP,xKwI8)17&&61b>ç~1'\n";


   $entropy          = ENTROPY_TYPE_PARANOIC; // Highest security level. Very slow but the best safest way to generate your random Nano SEED
   $password         = '%1\kmLaP,/xKwI8)17&&61b>ç|hy[~1'; // Ohhhh. What a strong password !!!
   $password_min_len = 15; // Minimum acceptable length of the password
   $password_max_len = 64; // Maximum acceptable length of the password
   $password_type    = PASS_MUST_HAVE_AT_LEAST_ONE_NUMBER|PASS_MUST_HAVE_AT_LEAST_ONE_SYMBOL| // Recommended password requirements
                       PASS_MUST_HAVE_AT_LEAST_ONE_UPPER_CASE|PASS_MUST_HAVE_AT_LEAST_ONE_LOWER_CASE;

   echo "Generating a Nano SEED and encrypting in a non deterministic key with password '".$password."'.\nIt can take a little longer\n";
   echo "Move the mouse, open programs to increase entropy to generate the Nano SEED...\n";

   try {

      $encrypted_nano_seed = php_c_gen_seed_to_encrypted_stream(

                       $entropy,
                       $password,
                       $password_min_len,
                       $password_max_len,
                       $password_type

                    );

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   echo "SUCCESS: Nano SEED generated and encrypted successfully in memory.";

?>
```

```sh
php decrypt_block.php
```

**Return value**

```sh
Creates a Nano SEED with a highest entropy level with password '%1kmLaP,xKwI8)17&&61b>ç~1'
Generating a Nano SEED and encrypting in a non deterministic key with password '%1\kmLaP,/xKwI8)17&&61b>ç|hy[~1'.
It can take a little longer
Move the mouse, open programs to increase entropy to generate the Nano SEED...
SUCCESS: Nano SEED generated and encrypted successfully in memory

# Encrypted NANO SEED in memory in binary block (352 Bytes long)
# ----------------------------------------------------------------
# 5f6e616e6f77616c6c657466696c655f000001004e414e4f205365656420456e
# 637279707465642066696c652f73747265616d2e204b65657020697420736166
# 6520616e64206261636b75702069742e20546869732066696c65206973207072
# 6f7465637465642062792070617373776f72642e2042555920424954434f494e
# 20616e64204e414e4f2021212100e0e1f2aeef6b77d3ba76f6bd477b47fe7681
# a3d9094badddcb5d19560fa20d8dbc925b57b5f4d804a663bad48557cc451827
# 5f0106690ad8a88c04bd2848c4cb2df0819cbc094566b0f9fbeb3f34a2ada355
# 006df20a2c5f79af9b5ef420d1af961d1905b086a91e58cc9ce4dc88ebdcc0e3
# 91154acd33b1afe2592216ce2526c4dd1a1aa798e94c614f5f9fdb6bbadea470
# 88565665cccdcf566c5027dac81407bff193599bcaf24633145f8aaa02c12020
# 75a6a940999d98b5a15c2e12303519b9709e6b718f6683d9dc4e98e0bba67bfa
```

##### Example 2 (Saving and encrypting your NANO Seed in block);

Saving and ecrypting your example Nano SEED = "3E4EAC9A2CA907F6CA48C3F9F2FD09F3C37F2891555A5F24FC0318A9317D2B65" with **password**=_MyPasswordHere1234@5678_

```sh
php -r "echo bin2hex(php_c_gen_seed_to_encrypted_stream('3E4EAC9A2CA907F6CA48C3F9F2FD09F3C37F2891555A5F24FC0318A9317D2B65', 'MyPasswordHere1234@5678', 15, 65, (PASS_MUST_HAVE_AT_LEAST_ONE_NUMBER|PASS_MUST_HAVE_AT_LEAST_ONE_SYMBOL|PASS_MUST_HAVE_AT_LEAST_ONE_UPPER_CASE|PASS_MUST_HAVE_AT_LEAST_ONE_LOWER_CASE)));"
```

**Return value**

```sh
5f6e616e6f77616c6c657466696c655f000001004e414e4f205365656420456e
637279707465642066696c652f73747265616d2e204b65657020697420736166
6520616e64206261636b75702069742e20546869732066696c65206973207072
6f7465637465642062792070617373776f72642e2042555920424954434f494e
20616e64204e414e4f2021212100f5cd704691168f67bea9ef815a35edc7ea7b
a69a654f2d3bbb4dccc006642dcb5bee435754c5446678fd5493dc449ebb794b
4616dd9f055fb5c4f190cc8f37e72d8b3921d2c06b5130956715b52e5e47dbb4
082696821149df4d32506497f015b5da8ededf28143b422e2913b5b285189ff6
2f7808622f5c29861ecef08fd324f8939e077945bad50fa812a10a5ece5c696c
28c2072227f24f168b06d21f0ab105c36787dc03894880036c61a6079442625f
a3e236862b53c0bc41538d499275783a733325ae2e1f7548e952adce20d8723e
```

##### Example 3 (Saving and encrypting your NANO Seed in block with the same Nano SEED and password in example 2);

Saving and ecrypting your example Nano SEED = "3E4EAC9A2CA907F6CA48C3F9F2FD09F3C37F2891555A5F24FC0318A9317D2B65" with **password**=_MyPasswordHere1234@5678_

```sh
php -r "echo bin2hex(php_c_gen_seed_to_encrypted_stream('3E4EAC9A2CA907F6CA48C3F9F2FD09F3C37F2891555A5F24FC0318A9317D2B65', 'MyPasswordHere1234@5678', 15, 65, (PASS_MUST_HAVE_AT_LEAST_ONE_NUMBER|PASS_MUST_HAVE_AT_LEAST_ONE_SYMBOL|PASS_MUST_HAVE_AT_LEAST_ONE_UPPER_CASE|PASS_MUST_HAVE_AT_LEAST_ONE_LOWER_CASE)));"
```

**Return value**

```sh
5f6e616e6f77616c6c657466696c655f000001004e414e4f205365656420456e
637279707465642066696c652f73747265616d2e204b65657020697420736166
6520616e64206261636b75702069742e20546869732066696c65206973207072
6f7465637465642062792070617373776f72642e2042555920424954434f494e
20616e64204e414e4f2021212100b38389db347bd67df6041ca05ffc564b5712
654eea7a0b094364aef2721bda4a2239f300b0130013638491a02ebb1a771d75
bfa8c050132e69ae057c7d82349c2c4ded4ecd57b30bde25d63fce8b6f53edf1
a785035a330c21963253fc2c007fde25fb0318bb2ca2fb63394b47e2f415d6ce
d50b7254d5b6d1d34b46f40a403c4f73e40b78fe74222de10aa12eff8e872595
66f0bd7e5add023ecd2eff126dd412367e7493b1565fb660c132a578abc71d39
5e206d93db181d4d3ea00ccd5bd4df6ebc7e253e67f004de1192c0518cc0d2da
```

**NOTICE**: Although you are using the same Nano SEED and the same password in example 2 and 3, encrypted block are **DIFFERENTS**. And both are valid and can be decrypted with _php_c_gen_encrypted_stream_to_seed()_

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_gen_encrypted_stream_to_seed()_

<h1>- php_c_generate_block()</h1>

### Description

Generates a Nano Block to be stored in Nano Blockchain

```php
$res = php_c_generate_block(

            $account,
            $previous,
            $representative,
            $balance,
            $balance_type,
            $val_send_rec,
            $val_send_rec_type,
            $link,
            $direction

       );
```

params|type|description
------|----|-----------
**_$account_**|string|Nano wallet or public key
**_$previous_**|string|Previous block
**_$representative_**|sring|Representative wallet or representative public key
**_$balance_**|string|Nano big number balance
**_$balance_type_**|integer|Nano big number type (see table below)
**_$val_send_rec_**|string|Value to send/receive
**_$val_send_rec_type_**|integer|Value to send/receive type (see table below)
**_$link_**|Destination wallet or destination public key or link
**_$direction_**|integer|Send or receive (see table below)

**_$balance_type_** type|description
-------------------|-----------
**BALANCE_REAL_STRING**|Input _$balance_ is big number real string
**BALANCE_RAW_STRING**|Input _$balance_ is big number raw string
**BALANCE_RAW_128**|Input _$balance_ is big number hex string

**_$val_send_rec_type_** type|description
-------------------|-----------
**VALUE_SEND_RECEIVE_REAL_STRING**|Input _$val_send_rec_type_ is big number real string
**VALUE_SEND_RECEIVE_RAW_STRING**|Input _$val_send_rec_type_ is big number raw string
**VALUE_SEND_RECEIVE_RAW_128**|Input _$val_send_rec_type_ is big number hex string

**_$direction_** type|description
-------------------------|-----------
**VALUE_TO_SEND**|Value to send
**VALUE_TO_RECEIVE**|Value to receive (open block)


#### Return value

Binary Nano block in memory variable.

##### Example 1

Create a file _create_block_ex1.php_ and type:

```php
<?php
//mon May 25 2020 17:58 -03

   /*
    * EXAMPLE: Prepares a block to receive funds (400 nanos) from nano_3js4zced6abrzy9wiy3q3ozsicszpnfm7oszumrbd9k4yirkhm977n8hbuxy
    */

   echo "Create Nano Block to receive (open block) 400.0 Nanos from nano_3js4zced6abrzy9wiy3q3ozsicszpnfm7oszumrbd9k4yirkhm977n8hbuxy\n";

   $account               = 'nano_1ru5kyg89aerkby6fbwndxchk7ksr3de1bafkz1r4k1796pbubjujrypwsdu';
   $previous              = '7F8E7DFE181544848FCC28CD969CC5539816B49CE17FCA03B7006CFADDA5C687';
   $representative        = 'nano_3naq5joid48991pxj95tu9z117bghwk3ndum1o4i85jb6gdkerj9rdj6p816';
   $balance               = '0.179';
   $balance_type          = BALANCE_REAL_STRING;
   $value_to_receive      = '400.0';
   $value_to_receive_type = VALUE_SEND_RECEIVE_REAL_STRING;
   $link                  = 'C722FA98B22138FF8FC878370D7F982B3FB51B32D73FDCF0959E42F43127CCE5';
   $direction             = VALUE_TO_RECEIVE;

   try {

      $nano_block = php_c_generate_block(

                       $account,
                       $previous,
                       $representative,
                       $balance,
                       $balance_type,
                       $value_to_receive,
                       $value_to_receive_type,
                       $link,
                       $direction

                    );

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   echo "Successfully block stored in memory in \$nano_block variable\n";

?>
```

```sh
php create_block_ex1.php
```

**Return value**

```sh
Create Nano Block to receive (open block) 400.0 Nanos from nano_3js4zced6abrzy9wiy3q3ozsicszpnfm7oszumrbd9k4yirkhm977n8hbuxy
Successfully block stored in memory in $nano_block variable

# Binary Nano block result representation in Memory (249 Bytes long)
0000000000000000000000000000000000000000000000000000000000000006
6363979c63a198927c46a7945f54f91659c056c0250d97c1814805392c9da63b
7f8e7dfe181544848fcc28cd969cc5539816b49ce17fca03b7006cfadda5c687
d1171c6b0588c7382dd89c7ad9fe00152e7f241a2f730545030e292397266227
000013baf81659d1d57d689a38000000
c722fa98b22138ff8fc878370d7f982b3fb51b32d73fdcf0959e42f43127cce5
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00
0000000000000000

#Human readable result (JSON Equivalent)
{
  "action": "process",
  "json_block": "true",
  "block": {
    "type": "state",
    "account": "nano_1ru5kyg89aerkby6fbwndxchk7ksr3de1bafkz1r4k1796pbubjujrypwsdu",
    "previous": "7F8E7DFE181544848FCC28CD969CC5539816B49CE17FCA03B7006CFADDA5C687",
    "representative": "nano_3naq5joid48991pxj95tu9z117bghwk3ndum1o4i85jb6gdkerj9rdj6p816",
    "balance": "400179000000000000000000000000000",
    "link": "C722FA98B22138FF8FC878370D7F982B3FB51B32D73FDCF0959E42F43127CCE5",
    "link_as_account": "nano_3js4zced6abrzy9wiy3q3ozsicszpnfm7oszumrbd9k4yirkhm977n8hbuxy",
    "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "work": "0000000000000000"
  }
}
```

##### Example 2

Create a file _create_block_ex2.php_ and type:

```php
<?php
//mon May 25 2020 17:58 -03

   /*
    * EXAMPLE 2: Prepares a block to open block with 1 Nano (1000000000000000000000000000000) RAW
    * from link 3673BE411A67C4F5906AB345D01DEC5F0034CF54A3BFE706E934FD724B181DCF
    */

   echo "Create Nano Block to receive (open block) 1 Nano from link 3673BE411A67C4F5906AB345D01DEC5F0034CF54A3BFE706E934FD724B181DCF\n";

   $account               = 'nano_1kzzdbp44ii5dxe89gqefgqg1ijjb5ced9cywktae77ikj9fs18xqktjmqju';
   $previous              = '7F8E7DFE181544848FCC28CD969CC5539816B49CE17FCA03B7006CFADDA5C687';
   $representative        = 'xrb_1cuenosfguwpot55eabwdeh8r3e3esdao8m6hb9ya3kyr38e9n5jo3qun8om';
   $balance               = '300';
   $balance_type          = BALANCE_REAL_STRING;
   $value_to_receive      = '1000000000000000000000000000000';
   $value_to_receive_type = VALUE_SEND_RECEIVE_RAW_STRING;
   $link                  = '3673BE411A67C4F5906AB345D01DEC5F0034CF54A3BFE706E934FD724B181DCF';
   $direction             = VALUE_TO_RECEIVE;

   try {

      $nano_block = php_c_generate_block(

                       $account,
                       $previous,
                       $representative,
                       $balance,
                       $balance_type,
                       $value_to_receive,
                       $value_to_receive_type,
                       $link,
                       $direction

                    );

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   echo "Successfully block stored in memory in \$nano_block variable\n";

?>
```

```sh
php create_block_ex2.php
```
**Return value**

```sh
Create Nano Block to receive (open block) 1 Nano from link 3673BE411A67C4F5906AB345D01DEC5F0034CF54A3BFE706E934FD724B181DCF
Successfully block stored in memory in $nano_block variable

# Binary Nano block result representation in Memory (249 Bytes long)
0000000000000000000000000000000000000000000000000000000000000006
4bff5a6c2142035f5863baec6baee0423148d4c59d5ee4b48614b0944edc80dd
7f8e7dfe181544848fcc28cd969cc5539816b49ce17fca03b7006cfadda5c687
2b6ca572d76f96ae8636213c5b1e6c058166568a9a647a4fe4065ec04cc3d071
00000ed7277460e2d77bbc6d40000000
3673be411a67c4f5906ab345d01dec5f0034cf54a3bfe706e934fd724b181dcf
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
04
0000000000000000

#Human readable result (JSON Equivalent)
{
  "action": "process",
  "json_block": "true",
  "block": {
    "type": "state",
    "account": "nano_1kzzdbp44ii5dxe89gqefgqg1ijjb5ced9cywktae77ikj9fs18xqktjmqju",
    "previous": "7F8E7DFE181544848FCC28CD969CC5539816B49CE17FCA03B7006CFADDA5C687",
    "representative": "xrb_1cuenosfguwpot55eabwdeh8r3e3esdao8m6hb9ya3kyr38e9n5jo3qun8om",
    "balance": "301000000000000000000000000000000",
    "link": "3673BE411A67C4F5906AB345D01DEC5F0034CF54A3BFE706E934FD724B181DCF",
    "link_as_account": "nano_1fmmqs1jnsy6ypa8oet7t1gyrqr18m9obaxzww5gkf9xgb7ji9ghu1tr9th7",
    "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "work": "0000000000000000"
  }
}
```

##### Example 3

Create a file _create_block_ex3.php_ and type:

```php
<?php
//mon May 25 2020 17:58 -03

   /*
    * EXAMPLE 3: Prepares a block to open first block (receive 10 Nanos) from link 2A825E929A29ED9F2763ACF3DCB0855BFE6A4C58E59F99AC8F596810FACAD283
    */

   echo "Create Nano Block to receive (open first block) 10 Nanos from link 2A825E929A29ED9F2763ACF3DCB0855BFE6A4C58E59F99AC8F596810FACAD283\n";

   $account               = 'nano_3d15845cjkqczun3k1379xwhgzdz5taj74j9zbbwaegg4okebkf6jfdppdku';
   $previous              = ''; // Empty string means first block
   $representative        = 'nano_1t675o8bsremxwn57di69f1qxrkjab51e383o51469ao1ktbeht6nyjd611h';
   $balance               = '0';
   $balance_type          = BALANCE_REAL_STRING;
   $value_to_receive      = '10';
   $value_to_receive_type = VALUE_SEND_RECEIVE_REAL_STRING;
   $link                  = '2A825E929A29ED9F2763ACF3DCB0855BFE6A4C58E59F99AC8F596810FACAD283';
   $direction             = VALUE_TO_RECEIVE;

   try {

      $nano_block = php_c_generate_block(

                       $account,
                       $previous,
                       $representative,
                       $balance,
                       $balance_type,
                       $value_to_receive,
                       $value_to_receive_type,
                       $link,
                       $direction

                    );

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   echo "Successfully block stored in memory in \$nano_block variable\n";

?>
```

```sh
php create_block_ex3.php
```

**Return value**

```sh
Create Nano Block to receive (open first block) 10 Nanos from link 2A825E929A29ED9F2763ACF3DCB0855BFE6A4C58E59F99AC8F596810FACAD283
Successfully block stored in memory in $nano_block variable

# Binary Nano block result representation in Memory (249 Bytes long)
0000000000000000000000000000000000000000000000000000000000000006
ac033086a8caeafee81900253f78f77d7f1e91128a27fa53c431ce1564c4c9a4
0000000000000000000000000000000000000000000000000000000000000000
68851d4c9ce193ef2832ae043b417ee25142460604c1a8c0221d1504b4963f44
0000007e37be2022c0914b2680000000
2a825e929a29ed9f2763acf3dcb0855bfe6a4c58e59f99ac8f596810facad283
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00
0000000000000000

#Human readable result (JSON Equivalent)
{
  "action": "process",
  "json_block": "true",
  "block": {
    "type": "state",
    "account": "nano_3d15845cjkqczun3k1379xwhgzdz5taj74j9zbbwaegg4okebkf6jfdppdku",
    "previous": "0000000000000000000000000000000000000000000000000000000000000000",
    "representative": "nano_1t675o8bsremxwn57di69f1qxrkjab51e383o51469ao1ktbeht6nyjd611h",
    "balance": "10000000000000000000000000000000",
    "link": "2A825E929A29ED9F2763ACF3DCB0855BFE6A4C58E59F99AC8F596810FACAD283",
    "link_as_account": "nano_1cn4dtbbnchfmwmp9d9mukracpzyfb87jsezm8paypda45xeonn5afyr8oru",
    "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "work": "0000000000000000"
  }
}
```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_parse_block_to_json()_

<h1>- php_c_generate_seed()</h1>

### Description

Geneartes a random seed using hardware TRNG (if available) or PRNG and genarates a random Nano SEED

```php
$res = php_c_generate_seed($entropy);
```

params|type|description
------|----|-----------
**_$entropy_**|integer|Entropy type (see below)

**_$entropy_** type|description
-------------------|-----------
**ENTROPY_TYPE_PARANOIC**|Paranoic entropy type. Very slow. Strongly recommended to create SEED's
**ENTROPY_TYPE_EXCELENT**|Excelent entropy tyoe. Slow. Recommended to create SEED's
**ENTROPY_TYPE_GOOD**|Good entropy type. Normal. Standard type to create SEED's
**ENTROPY_TYPE_NOT_ENOUGH**|Not enough. Fast. Not recommended for creating SEED's
**ENTROPY_TYPE_NOT_RECOMENDED**|Not recommended. Very fast. Try not to use this option. Recommended only to generate temporary SEED's

#### Return value

Nano SEED encoded hex string

##### Example

```php
php -r "echo php_c_generate_seed(ENTROPY_TYPE_PARANOIC);"
```

**Return value**

```sh
# RETURN VALUE
52A90664B8C463BD20ECCDDE96FAADE8E95CEB3F4E5978E6A5E74B4E00478F4A
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_generate_token()</h1>

### Description

Generates a 16 bytes with non deterministic hash token

```php
$res = php_c_generate_token($data, $password);
```

params|type|description
------|----|-----------
**_$data_**|string|Data do be assigned
**_$password_**|string|Password to define non deterministic hash

#### Return value

Token encoded in hex string

##### Example 1

Hash string "_Hello World_" with password "_MyPassword@1234_"

```sh
php -r "echo php_c_generate_token('Hello World', 'MyPassword@1234');"
```

**Return value**

```sh
# RETURN VALUE
c70576a2e31d0b6e071d7352c4a43b5f
```

##### Example 2

Hash string "_Hello World_" with password "_MyPassword@1234_" (Again)

```sh
php -r "echo php_c_generate_token('Hello World', 'MyPassword@1234');"
```

**Return value**

```sh
# RETURN VALUE
f87a96e215e0a3c56f7f0969288956cd
```

_Password_ and _data_ are the same but hash are different and both are valid


**On error**

Throws _MyNanoCEmbeddedException_

**See also**

_php_c_verify_token()_

<h1>- php_c_get_account_from_block()</h1>

### Description

Extracts account with encoded Nano Base32 string or public key hex string

```php
$res = php_c_get_account_from_block($block, $type, $prefix);
```

params|type|description
------|----|-----------
**_$block_**|binary|Binary Nano block
**_$type_**|integer|Type 0 for wallet address (with _nano__ or _xrb__ prefixes) or 1 for hex string (public key)
**_$prefix_**|string|(Optional) If ommited, then prefix will be _NANO_PREFIX_ prefix when type is 0. Choose _NANO_PREFIX_ or _XRB_PREFIX_ prefixes

#### Return value

Extracted Nano wallet with encoded Base32 or hex string public key

##### Example

```php
<?php

/*
 Assuming Nano block below is in $block variable
 0000000000000000000000000000000000000000000000000000000000000006
 918105963ce5d61ad9d74d294164fac36a077b5e2b53d219e619d5ee3e64e1b0
 f9252d13ec4103ccc6b1f1712c617413adc741d16a465452ca90c504d9f2c278
 22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
 000000000052b7d2dcc80cd2e4000000
 f9640ff8804a3720efc9d2a190cdcac87011b6eb2bff9bcda6e15400ec76d8b0
 d6a78e49f87bb5e019c4013144eafe3102e713eadde0bd61b2688ca0d1946a8601a6276fc43beccdf798225b67d65329bcaf3ceb12bc5e17ed542c6f131d8006
 00
 7865287ae2880e4a
*/

echo php_c_get_account_from_block($block, 0);
echo "\n";
echo php_c_get_account_from_block($block, 1);
echo "\n";
echo php_c_get_account_from_block($block, 0, NANO_PREFIX);
echo "\n";
echo php_c_get_account_from_block($block, 0, XRB_PREFIX);

?>
```

**Return value**

```sh
# RETURN VALUE
nano_36e31pd5ssgp5dexgmbba7khoiuc1xxowctmtaeye8goxrz8brfi48iexshm
918105963CE5D61AD9D74D294164FAC36A077B5E2B53D219E619D5EE3E64E1B0
nano_36e31pd5ssgp5dexgmbba7khoiuc1xxowctmtaeye8goxrz8brfi48iexshm
xrb_36e31pd5ssgp5dexgmbba7khoiuc1xxowctmtaeye8goxrz8brfi48iexshm
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_get_balance_from_block()</h1>

### Description

Extracts balances from binary nano block

```php
$res = php_c_get_balance_from_block($block, $balance_type);
```

params|type|description
------|----|-----------
**_$block_**|binary|Binary Nano block
**_$balance_type_**|integer|(Optional) Balance type. (See table below). If ommited balance type will be parsed to real value

**_$balance_type_** type|description
------------------------|-----------
**BALANCE_REAL_STRING**|Real string value
**BALANCE_RAW_STRING**|Raw string value
**BALANCE_RAW_128**|Hex string value

#### Return value

Extracted Nano balance value

##### Example

```php
<?php

/*
 Assuming Nano block below is in $block variable
 0000000000000000000000000000000000000000000000000000000000000006
 918105963ce5d61ad9d74d294164fac36a077b5e2b53d219e619d5ee3e64e1b0
 f9252d13ec4103ccc6b1f1712c617413adc741d16a465452ca90c504d9f2c278
 22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
 00001b9dd181a316c69b1feb73b30000
 f9640ff8804a3720efc9d2a190cdcac87011b6eb2bff9bcda6e15400ec76d8b08
 4daaa49ccf95d10353b93711c24e605aa2219dac2e5020996619f7184bb8733ee733d2a2e033481aa5bf82652aa201b63a58f6ef4cd43a8468f6112d4ad8d07
 00
 7865287ae2880e4a
*/

echo php_c_get_balance_from_block($block);
echo "\n";
echo php_c_get_balance_from_block($block, BALANCE_RAW_128);
echo "\n";
echo php_c_get_balance_from_block($block, BALANCE_RAW_STRING);
echo "\n";
echo php_c_get_balance_from_block($block, BALANCE_REAL_STRING);
echo "\n";
echo "Finally Hello World\n";

?>
```

**Return value**

```sh
# RETURN VALUE
560.12871990198387                # Real value
00001b9dd181a316c69b1feb73b30000  # Hex string value
560128719901983870000000000000000 # Raw balance string
560.12871990198387                # Real value
Finally Hello World
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_get_block_hash()</h1>

### Description

Calculates block hash in Nano Block

```php
$res = php_c_get_block_hash($block);
```

params|type|description
------|----|-----------
**_$block_**|binary|Binary Nano block

#### Return value

Nano block hash

##### Example

```php
<?php

/*
 Assuming Nano block below is in $block variable
 0000000000000000000000000000000000000000000000000000000000000006
 918105963ce5d61ad9d74d294164fac36a077b5e2b53d219e619d5ee3e64e1b0
 f9252d13ec4103ccc6b1f1712c617413adc741d16a465452ca90c504d9f2c278
 22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
 00001b9dd181a316c69b1feb73b30000
 f9640ff8804a3720efc9d2a190cdcac87011b6eb2bff9bcda6e15400ec76d8b08
 4daaa49ccf95d10353b93711c24e605aa2219dac2e5020996619f7184bb8733ee733d2a2e033481aa5bf82652aa201b63a58f6ef4cd43a8468f6112d4ad8d07
 00
 7865287ae2880e4a
*/

echo php_c_get_block_hash($block);
echo "\nFinally Hello World\n";

?>
```

**Return value**

```sh
# RETURN VALUE
200D55EB5D65BD5CBB095E20873D7E7900D58496CAEB3CA263C778BA9D932C95
Finally Hello World
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_get_difficulty()</h1>

### Description

Calculates a relative difficulty given a _work_, _hash_ and _threshold_

```php
$res = php_c_get_difficulty($hash, $work, $threshold);
```

params|type|description
------|----|-----------
**_$block_**|string|Hash of the block
**_$work_**|string|Calculated work
**_$threshold_**|string|(Optional) Threshold. If threshold is ommited then _DEFAULT_NANO_POW_THRESHOLD = 0xffffffc000000000_ is assumed

#### Return value

JSON string value

##### Example 1

```sh
php -r "echo php_c_get_difficulty('F9252D13EC4103CCC6B1F1712C617413ADC741D16A465452CA90C504D9F2C278', '0x4a0e88e27a286578');"
```

**Return value**

```sh
# RETURN VALUE
{
  "hash": "F9252D13EC4103CCC6B1F1712C617413ADC741D16A465452CA90C504D9F2C278",
  "work": "0x4a0e88e27a286578",
  "difficulty": "0xffffffef5e1596a0",
  "base_difficulty": "0xffffffc000000000",
  "multiplier": "3.84789208342411",
  "valid": "1"
}
```

##### Example 2

```sh
php -r "echo php_c_get_difficulty('97754bc2448355786175c4f8f46ee281336fda0ef83c06a3524b1664c9c9bb6a', '0x300607865057a2fb');"
```

**Return value**

```sh
# RETURN VALUE
{
  "hash": "97754bc2448355786175c4f8f46ee281336fda0ef83c06a3524b1664c9c9bb6a",
  "work": "0x300607865057a2fb",
  "difficulty": "0xfffffff81bffd01f",
  "base_difficulty": "0xffffffc000000000",
  "multiplier": "8.11088815564106",
  "valid": "1"
}
```

##### Example 3

```sh
php -r "echo php_c_get_difficulty('97754bc2448355786175c4f8f46ee281336fda0ef83c06a3524b1664c9c9bb6a', '18446743901642424320');"
# 18446743901642424320(decimal) = 0xffffffd7f0000000(hex)
# Use 0x prefix for hexadecimal Ex.: 0xffffffd7f0000000
# Use 0 prefic for octal. Ex.: 01777777775376000000000
# No prefix for decimal. Ex.: 18446743901642424320
```

**Return value**

```sh
# RETURN VALUE
{
  "hash": "b0cbcbe1b522fbac1ba1b1880dcea19afdae31008a242b7d9c6165982559fe53",
  "work": "0xa5422ca8ae8ca022",
  "difficulty": "0xfffffff23e8131c1",
  "base_difficulty": "0xffffffd7f0000000",
  "multiplier": "2.91239914457107",
  "valid": "1"
}
```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_nano_proof_of_work()_

    Function [ <internal:mynanoembedded> function php_c_get_entropy_name ] {

      - Parameters [1] {
        Parameter #0 [ <required> $entropy ]
      }
    }

<h1>- php_c_get_entropy_name()</h1>

### Description

Get a entropy name string given a index or entropy value

```php
$res = php_c_get_entropy_name($entropy);
```

params|type|description
------|----|-----------
**_$entropy_**|integer|Entropy value, index or char index value

#### Return value

String value of the entropy

##### Example 1

```sh
php -r "echo php_c_get_entropy_name(1);"
```

**Return value**

```sh
F_ENTROPY_TYPE_PARANOIC
```

##### Example 2

```sh
php -r "echo php_c_get_entropy_name('1');"
```

**Return value**

```sh
F_ENTROPY_TYPE_PARANOIC
```

##### Example 3

```sh
php -r "echo php_c_get_entropy_name('2');"
```

**Return value**

```sh
F_ENTROPY_TYPE_EXCELENT
```

##### Example 3

```sh
php -r "echo php_c_get_entropy_name(ENTROPY_TYPE_GOOD);"
```

**Return value**

```sh
F_ENTROPY_TYPE_GOOD
```

<h1>- php_c_get_link_from_block()</h1>

### Description

Extracts link with encoded Nano Base32 string or link hex string

```php
$res = php_c_get_link_from_block($block, $type, $prefix);
```

params|type|description
------|----|-----------
**_$block_**|binary|Binary Nano block
**_$type_**|integer|Type 0 for wallet address (with _nano__ or _xrb__ prefixes) or 1 for hex string (link)
**_$prefix_**|string|(Optional) If ommited, then prefix will be _NANO_PREFIX_ prefix when type is 0. Choose _NANO_PREFIX_ or _XRB_PREFIX_ prefixes

#### Return value

Extracted Nano link as account with encoded Base32 or hex string public key

##### Example

```php
<?php

/*
 Assuming Nano block below is in $block variable
 0000000000000000000000000000000000000000000000000000000000000006
 918105963ce5d61ad9d74d294164fac36a077b5e2b53d219e619d5ee3e64e1b0
 f9252d13ec4103ccc6b1f1712c617413adc741d16a465452ca90c504d9f2c278
 22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
 000000000052b7d2dcc80cd2e4000000
 f9640ff8804a3720efc9d2a190cdcac87011b6eb2bff9bcda6e15400ec76d8b0
 d6a78e49f87bb5e019c4013144eafe3102e713eadde0bd61b2688ca0d1946a8601a6276fc43beccdf798225b67d65329bcaf3ceb12bc5e17ed542c6f131d8006
 00
 7865287ae2880e4a
*/

echo php_c_get_link_from_block($block, 0);
echo "\n";
echo php_c_get_link_from_block($block, 1);
echo "\n";
echo php_c_get_link_from_block($block, 0, NANO_PREFIX);
echo "\n";
echo php_c_get_link_from_block($block, 0, XRB_PREFIX);

?>
```

**Return value**

```sh
# RETURN VALUE
nano_3yd63zwa1kjq65qwmno3k58wok5i48ugpczzmh8tfrcn15p9fp7it3ptoj8w
F9640FF8804A3720EFC9D2A190CDCAC87011B6EB2BFF9BCDA6E15400EC76D8B0
nano_3yd63zwa1kjq65qwmno3k58wok5i48ugpczzmh8tfrcn15p9fp7it3ptoj8w
xrb_3yd63zwa1kjq65qwmno3k58wok5i48ugpczzmh8tfrcn15p9fp7it3ptoj8w
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_get_prefixes_from_block()</h1>

### Description

Extracts prefixes from Nano block

```php
$res = php_c_get_prefixes_from_block($block);
```

params|type|description
------|----|-----------
**_$block_**|binary|Binary Nano block

#### Return value

Prefixes information of the Nano block as integer

##### Example

```php
<?php

/*
 Assuming Nano block below is in $block variable
 0000000000000000000000000000000000000000000000000000000000000006
 918105963ce5d61ad9d74d294164fac36a077b5e2b53d219e619d5ee3e64e1b0
 f9252d13ec4103ccc6b1f1712c617413adc741d16a465452ca90c504d9f2c278
 22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
 000000000052b7d2dcc80cd2e4000000
 f9640ff8804a3720efc9d2a190cdcac87011b6eb2bff9bcda6e15400ec76d8b0
 d6a78e49f87bb5e019c4013144eafe3102e713eadde0bd61b2688ca0d1946a8601a6276fc43beccdf798225b67d65329bcaf3ceb12bc5e17ed542c6f131d8006
 00
 7865287ae2880e4a
*/

echo php_c_get_prefixes_from_block($block);
echo "\n";

?>
```

**Return value**

```sh
0 #Returns 0 (Account, Destination or Link, Representative) are in nano_ prefix
```

**On error**

Throws _MyNanoCEmbeddedException_


**Documentation on progress ...**

## SUMMARY: Constants, Functions and Classes

### In console type:

```sh
php --re mynanoembedded
```

### **Result**

```sh
Extension [ <persistent> extension #15 mynanoembedded version 1.0 ] {

  - Constants [66] {
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
    Constant [ integer READ_SEED_FROM_STREAM ] { 1 }
    Constant [ integer READ_SEED_FROM_FILE ] { 2 }
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

      - Parameters [3] {
        Parameter #0 [ <required> $encrypted_stream ]
        Parameter #1 [ <required> $password ]
        Parameter #2 [ <required> $dictionary_file ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_is_valid_nano_seed_encrypted ] {

      - Parameters [2] {
        Parameter #0 [ <required> $encrypted_stream ]
        Parameter #1 [ <optional> $read_from ]
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

