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

There is a POC (Proof of Concept) implementing myNanoPHP Library in ReactJS for developers to test and start using this library reading [README_API template tutorial](README_API.md)

<p align="center">
  <img src="/docs/images/poc001.png">
</p>

## FUNCTIONS

<h1>- php_c_add_sub_balance()</h1>

```sh
    Function [ <internal:mynanoembedded> function php_c_add_sub_balance ] {

      - Parameters [3] {
        Parameter #0 [ <required> $valueA ]
        Parameter #1 [ <required> $valueB ]
        Parameter #2 [ <required> $type ]
      }
    }
```

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

```sh
    Function [ <internal:mynanoembedded> function php_c_bip39_to_nano_seed ] {

      - Parameters [2] {
        Parameter #0 [ <required> $bip39 ]
        Parameter #1 [ <required> $dictionary_path ]
      }
    }
```

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

```sh
    Function [ <internal:mynanoembedded> function php_c_block_to_p2pow ] {

      - Parameters [5] {
        Parameter #0 [ <required> $block ]
        Parameter #1 [ <required> $worker_wallet ]
        Parameter #2 [ <required> $worker_representative ]
        Parameter #3 [ <required> $worker_fee ]
        Parameter #4 [ <optional> $worker_fee_type ]
      }
    }
```

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

```sh
    Function [ <internal:mynanoembedded> function php_c_brainwallet_generate ] {

      - Parameters [4] {
        Parameter #0 [ <required> $brainwallet ]
        Parameter #1 [ <required> $salt ]
        Parameter #2 [ <required> $mode ]
        Parameter #3 [ <optional> $dictionary_path ]
      }
    }
```

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

```sh
    Function [ <internal:mynanoembedded> function php_c_calculate_work_from_block ] {

      - Parameters [3] {
        Parameter #0 [ <required> &$block ]
        Parameter #1 [ <required> $number_of_threads ]
        Parameter #2 [ <optional> $threshold ]
      }
    }
```

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

```sh
    Function [ <internal:mynanoembedded> function php_c_compare ] {

      - Parameters [4] {
        Parameter #0 [ <required> $valueA ]
        Parameter #1 [ <required> $valueB ]
        Parameter #2 [ <required> $type ]
        Parameter #3 [ <required> $compare ]
      }
    }
```

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

```sh
    Function [ <internal:mynanoembedded> function php_c_convert_balance ] {

      - Parameters [2] {
        Parameter #0 [ <required> $balance ]
        Parameter #1 [ <required> $type ]
      }
    }
```

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

```sh
    Function [ <internal:mynanoembedded> function php_c_from_multiplier ] {

      - Parameters [2] {
        Parameter #0 [ <required> $multiplier ]
        Parameter #1 [ <required> $base_difficulty ]
      }
    }
```

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

**See also**

- _php_c_to_multiplier()_

<h1>- php_c_gen_encrypted_stream_to_seed()</h1>

```sh
    Function [ <internal:mynanoembedded> function php_c_gen_encrypted_stream_to_seed ] {

      - Parameters [3] {
        Parameter #0 [ <required> $encrypted_stream ]
        Parameter #1 [ <required> $password ]
        Parameter #2 [ <required> $dictionary_file ]
      }
    }
```

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

```sh
    Function [ <internal:mynanoembedded> function php_c_gen_seed_to_encrypted_stream ] {

      - Parameters [5] {
        Parameter #0 [ <required> $entropy ]
        Parameter #1 [ <required> $password ]
        Parameter #2 [ <required> $password_min_len ]
        Parameter #3 [ <required> $password_max_len ]
        Parameter #4 [ <optional> $password_type ]
      }
    }
```

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

```sh
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
```

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

```sh
    Function [ <internal:mynanoembedded> function php_c_generate_seed ] {

      - Parameters [1] {
        Parameter #0 [ <required> $entropy ]
      }
    }
```

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

```sh
    Function [ <internal:mynanoembedded> function php_c_generate_token ] {

      - Parameters [2] {
        Parameter #0 [ <required> $data ]
        Parameter #1 [ <required> $password ]
      }
    }
```

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

```sh
    Function [ <internal:mynanoembedded> function php_c_get_account_from_block ] {

      - Parameters [3] {
        Parameter #0 [ <required> $block ]
        Parameter #1 [ <optional> $type ]
        Parameter #2 [ <optional> $prefix ]
      }
    }
```

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

```sh
    Function [ <internal:mynanoembedded> function php_c_get_balance_from_block ] {

      - Parameters [2] {
        Parameter #0 [ <required> $block ]
        Parameter #1 [ <optional> $balance_type ]
      }
    }
```

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

```sh
    Function [ <internal:mynanoembedded> function php_c_get_block_hash ] {

      - Parameters [1] {
        Parameter #0 [ <required> $block ]
      }
    }
```

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

```sh
    Function [ <internal:mynanoembedded> function php_c_get_difficulty ] {

      - Parameters [3] {
        Parameter #0 [ <required> $hash ]
        Parameter #1 [ <required> $work ]
        Parameter #2 [ <optional> $threshold ]
      }
    }
```

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

<h1>- php_c_get_entropy_name()</h1>

```sh
    Function [ <internal:mynanoembedded> function php_c_get_entropy_name ] {

      - Parameters [1] {
        Parameter #0 [ <required> $entropy ]
      }
    }
```

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

```sh
    Function [ <internal:mynanoembedded> function php_c_get_link_from_block ] {

      - Parameters [3] {
        Parameter #0 [ <required> $block ]
        Parameter #1 [ <optional> $type ]
        Parameter #2 [ <optional> $prefix ]
      }
    }
```sh

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

```sh
    Function [ <internal:mynanoembedded> function php_c_get_prefixes_from_block ] {

      - Parameters [1] {
        Parameter #0 [ <required> $block ]
      }
    }
```

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

<h1>- php_c_get_previous_from_block()</h1>

```sh
    Function [ <internal:mynanoembedded> function php_c_get_previous_from_block ] {

      - Parameters [1] {
        Parameter #0 [ <required> $block ]
      }
    }
```

### Description

Extracts previous hash from Nano Block

```php
$res = php_c_get_previous_from_block($block);
```

params|type|description
------|----|-----------
**_$block_**|binary|Binary Nano block

#### Return value

Previous block Nano hash

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

echo php_c_get_previous_from_block($block);
echo "\n";

?>
```

**Return value**

```sh
F9252D13EC4103CCC6B1F1712C617413ADC741D16A465452CA90C504D9F2C278
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_get_representative_from_block()</h1>

### Description

Extracts representative with encoded Nano Base32 string or link hex string

```php
$res = php_c_get_representative_from_block($block, $type, $prefix);
```

params|type|description
------|----|-----------
**_$block_**|binary|Binary Nano block
**_$type_**|integer|Type 0 for wallet address (with _nano__ or _xrb__ prefixes) or 1 for hex string (link)
**_$prefix_**|string|(Optional) If ommited, then prefix will be _NANO_PREFIX_ prefix when type is 0. Choose _NANO_PREFIX_ or _XRB_PREFIX_ prefixes

#### Return value

Extracted Nano representative with encoded Base32 or hex string public key

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

echo php_c_get_representative_from_block($block, 0);
echo "\n";
echo php_c_get_representative_from_block($block, 1);
echo "\n";
echo php_c_get_representative_from_block($block, 0, NANO_PREFIX);
echo "\n";
echo php_c_get_representative_from_block($block, 0, XRB_PREFIX);

?>
```

**Return value**

```sh
# RETURN VALUE
nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc
22F2C23D07F7EB43EBDB470E35493EBBADFDC447BD4B983623703767728974B6
nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc
xrb_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_get_signature_from_block()</h1>

### Description

Extracts previous hash from Nano Block

```php
$res = php_c_get_signature_from_block($block);
```

params|type|description
------|----|-----------
**_$block_**|binary|Binary Nano block

#### Return value

Signature of the Nano Block

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

echo php_c_get_signature_from_block($block);
echo "\n";

?>
```

**Return value**

```sh
D6A78E49F87BB5E019C4013144EAFE3102E713EADDE0BD61B2688CA0D1946A8601A6276FC43BECCDF798225B67D65329BCAF3CEB12BC5E17ED542C6F131D8006
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_get_work_from_block()</h1>

### Description

Extract calculated work from Nano Block

```php
$res = php_c_get_work_from_block($block);
```

params|type|description
------|----|-----------
**_$block_**|binary|Binary Nano block

#### Return value

Calculated work from Nano Block

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

echo php_c_get_work_from_block($block);
echo "\n";

?>
```

**Return value**

```sh
0x4a0e88e27a286578
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_library_info()</h1>

### Description

Information about _myNanoPHP C library_ in JSON string format

```php
$res = php_c_library_info();
```

#### Return value

Info about _myNanoPHP C Library_ in JSON string format

<h1>- php_c_license()</h1>

### Description

Prints MIT license clausule

```php
$res = php_c_license();
```

#### Return value

MIT license text string

<h1>- php_c_nano_check_sig()</h1>

### Description

Verifies if a signature of a hash is valid using Nano wallet (_xrb__ or _nano__) or public key

```php
$res = php_c_nano_check_sig($singature, $message, $nano_pk);
```

params|type|description
------|----|-----------
**_$signature_**|string|Signature of the message
**_$message_**|string|Hash of the message in Blake2b
**_$nano_pk_**|string|Base32 encoded Nano wallet or Nano public key

#### Return value

_True_ if signature is valid or _False_ if signature is invalid

##### Example 1

```sh
php -r "echo (php_c_nano_check_sig('3FFD1927EFB8747174A4124057AEE94A58C9304F123C0C7921A8F102F1B5C53C2B1A30E078C9533A01B95D7E9B78F4063E7D4F9B696828FE673B4422AA62E604', 'D572DC8E6F179AF1BB223D8946AFC6411EC35D7CD3176A8E2DA3CC2FC41DA30B', 'nano_3xemzomy4atzmq5u55mzzixqw9zxykyeyeiqia7rb1xy1saufpr8wzder1xh'))?'TRUE':'FALSE';"
```

**Return value**

```sh
TRUE
```

##### Example 2

```sh
php -r "echo (php_c_nano_check_sig('8235D51B5E80B695A93E11985E69279A0ED0024941469D8F447E701D97A8F612320A0D784A4ACBC162DAEDD682797F23A4FADAD78093356F89A2FF57C7B9A400', 'CAC6B8707B3978771C9044E91C430172400852374D2A3EE65FE08CB259F69233', 'xrb_1qpmofer8nymj1mwmegxfjhqqpcwwm78uiqtshrrpkoij47b8apdc4y5apor'))?'TRUE':'FALSE';"
```

**Return value**

```sh
TRUE
```

##### Example 3

```sh
php -r "echo (php_c_nano_check_sig('784AD4EF466745ACE911F0A5103DB030B6A505912284C2BC03E852A68BE16E16DBEAD6CCE2D1EB4169D0DB188430424870A2AFD0098014F3E282172B4AB7E808', 'AAAE2E008893C35CC1C53FD7643AA4E851F6BA332A314FE31D1B345066F7E384', '511AC43730543F18C07836BB2F61032B16EDA46F10779CA0F330C9B663881060'))?'TRUE':'FALSE';"
```

**Return value**

```sh
TRUE
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_nano_proof_of_work()</h1>

### Description

Calculates a Proof of Work of a given hash with multithread support

```php
$res = php_c_nano_proof_of_work($hash, $n_thr, $threshold);
```

params|type|description
------|----|-----------
**_$hash_**|string|Hash to be computed
**_$n_thr_**|string|Number of CPU threads
**_$threshold_**|string|(Optional) Threshold. If ommitted then _DEFAULT_NANO_POW_THRESHOLD = 0xffffffc000000000_ is used

#### Return value

Calculated Proof of Work of the hash in JSON string format

##### Example 1

```sh
php -r "echo php_c_nano_proof_of_work('4e5e494fa316ffc82b8252b23524f1433639858267d641c1217059dc4403e045', 4);"
```

**Return value**

```sh
{

   "pow":"0xfdbf88e2507dc654",
   "threshold":"0xffffffc000000000",
   "multiplier":"1.000000000000000"

}
```

##### Example 2

```sh
php -r "echo php_c_nano_proof_of_work('4e5e494fa316ffc82b8252b23524f1433639858267d641c1217059dc4403e045', 4, '0xfffffff000000000');"
```

**Return value**

```sh
{

   "pow":"0xa03503b1bebcc2fb",
   "threshold":"0xfffffff000000000",
   "multiplier":"4.000000000000000"

}
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_nano_seed_to_bip39()</h1>

### Description

Parses a Nano SEED to Bip39 mnemonic

```php
$res = php_c_nano_seed_to_bip39($seed, $dictionary_path);
```

params|type|description
------|----|-----------
**_$seed_**|string|Nano SEED to be parsed
**_$dictionary_path_**|string|Path and name of the dictionary *.dic

#### Return value

Bip39 encoded string

##### Example

```sh
php -r "echo php_c_nano_seed_to_bip39('27e990765dfa506201a0ba85288efd33502864d18e42cb0873fe3a3dc21a7132', '/var/www/html/dictionary.dic');"
```

**Return value**

```sh
child erode budget room pink country alley blanket lunch dutch satisfy grit action crash economy sign slam drum zebra inner switch artwork shadow extra
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_nano_verify_work()</h1>

### Description

Parses a Nano SEED to Bip39 mnemonic

```php
$res = php_c_nano_verify_work($hash, $work, $threshold);
```

params|type|description
------|----|-----------
**_$hash_**|string|Nano SEED to be parsed
**_$work_**|string|Work
**_$threshold_**|string|(Optional) Threshold. If ommitted then _DEFAULT_NANO_POW_THRESHOLD = 0xffffffc000000000_ is used

#### Return value

_TRUE_ is work is valid or _FALSE_ is is invalid

##### Example 1

```sh
php -r "echo (php_c_nano_verify_work('4e5e494fa316ffc82b8252b23524f1433639858267d641c1217059dc4403e045', '0xfdbf88e2507dc654', '0xfffffffc00000000'))?'TRUE':'FALSE';"
```

**Return value**

```sh
FALSE
```

##### Example 2

```sh
php -r "echo (php_c_nano_verify_work('4e5e494fa316ffc82b8252b23524f1433639858267d641c1217059dc4403e045', '0xfdbf88e2507dc654'))?'TRUE':'FALSE';"
```

**Return value**

```sh
TRUE
```

##### Example 2

```sh
php -r "echo (php_c_nano_verify_work('4e5e494fa316ffc82b8252b23524f1433639858267d641c1217059dc4403e045', '0xfdbf88e2507dc654', '0xfffffffc00000000'))?'TRUE':'FALSE';"
```

**Return value**

```sh
TRUE
```

##### Example 3

```sh
php -r "echo (php_c_nano_verify_work('4e5e494fa316ffc82b8252b23524f1433639858267d641c1217059dc4403e045', '0x54bc660196cd155a', '0xfffffffc00000000'))?'TRUE':'FALSE';"
```

**Return value**

```sh
TRUE
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_nano_wallet_to_public_key()</h1>

### Description

Parses a Nano SEED to Bip39 mnemonic

```php
$res = php_c_nano_wallet_to_public_key($Nano);
```

params|type|description
------|----|-----------
**_$Nano_**|string|Nano wallet Base32 encoded to be parsed

#### Return value

Hex string value of the extracted public key

##### Example 1

```sh
php -r "echo php_c_nano_wallet_to_public_key('nano_1ru5kyg89aerkby6fbwndxchk7ksr3de1bafkz1r4k1796pbubjujrypwsdu');"
```

**Return value**

```sh
6363979C63A198927C46A7945F54F91659C056C0250D97C1814805392C9DA63B
```

##### Example 2

```sh
php -r "echo php_c_nano_wallet_to_public_key('xrb_3oj16m1u5h3m9buboxynbwndxyksiy4rjet5cy5nj8fhgjw5h7msrhxud3sz');"
```

**Return value**

```sh
D62024C1B1BC333A769AF7D44F28BEFA59878588B34357874899AF7478379679
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_p2pow_to_json()</h1>

### Description

Parses a P2PoW Nano block to JSON

```php
$res = php_c_p2pow_to_json($block);
```

params|type|description
------|----|-----------
**_$block_**|string|P2PoW Nano block to be parsed to JSON

#### Return value

Formated JSON string

##### Example

Create a file _p2pow2json.php_ and type:

```php
<?php
//mon jun 01 2020 15:24:27 -03 

   /*
    * EXAMPLE: Parse P2PoW to JSON example
    */

   echo "STEP1: Create Nano Block to receive 2.281 Nanos (open block) from link 79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1\n";

   //account_private_key => SECURITY WARNING !!! Private key must be in a safe place. NEVER tell your Private KEY, SEED, Bip39 or Brainwallet to ANYBODY
   $account_private_key = '19B8423A2D010067C03F88A35836967894009D439FDAE79B29CDEA8B06C0062F97A886ECB1EE8BA6B0E455D1419FBEBA367986810CB3220AE0B9F9A585C86779';
   /////////////////////////////////////////////////////////// $account_private_key (KEEP IT SAFE) /////////////////////////////////////////////////////////

   $account             = 'nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg';
   $previous            = 'F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278';
   $representative      = 'nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc';
   $balance             = '16.2300118101';
   $balance_type        = BALANCE_REAL_STRING;
   $value_to_send       = '2.281';
   $value_to_send_type  = VALUE_SEND_RECEIVE_REAL_STRING;
   $destination         = '79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1';
   $direction           = VALUE_TO_RECEIVE;

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

   echo "SUCCESS: Nano block created. Now adding fee to Nano block ...\nSTEP 2:\n";

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

   echo "\nSTEP3: Signing your P2PoW block with private keypair ...\n";

   try {

      php_c_sign_p2pow_block($worker_fee_block, $account_private_key);

   } catch (Exception $e) {

      echo "Error code in 'php_c_sign_p2pow_block' ".$e->getCode()."Error message: ".$e->getMessage();
      exit(1);

   }

   echo "SUCCESS\nP2PoW Fee block signed block =>\n";
   echo bin2hex($worker_fee_block);

   echo "\nSTEP4: Parsing P2PoW to JSON ...\n";

   try {

      $p2pow_to_json = php_c_p2pow_to_json($worker_fee_block);

   } catch (Exception $e) {

      echo "Error code in 'php_c_p2pow_to_json' ".$e->getCode()."Error message: ".$e->getMessage();
      exit(1);

   }

   echo "\nSUCCESS: P2PoW JSON signed block:\n\n";

   echo $p2pow_to_json;
   echo "\n\nFinally Hello World\n";

?>

```

```sh
php p2pow2json.php
```

**Return value**

```sh
STEP1: Create Nano Block to receive 2.281 Nanos (open block) from link 79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1
SUCCESS: Nano block created. Now adding fee to Nano block ...
STEP 2:

STEP3: Signing your P2PoW block with private keypair ...
SUCCESS
P2PoW Fee block signed block =>
0000000000000000000000000000000000000000000000000000000000000006
97a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779
f9252d12ec2103cad6b2e7212c617413adc741d16a465452ca90c504d9f2c278
22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
000000e9a44e168ac332b4814c500000
79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1
5de3b33b503cc2eb206bcfd29add24d1e1b6548b5ceafe73f75f5b10948ceb887cfa6779f86f6690b84dfaf4dc8e7fdd3b0639f560cc9b78d01262cd99ee390a
00
0000000000000000
0000000000000000000000000000000000000000000000000000000000000006
97a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779
2fc9637c3b2681d03f9167173641869a54f2b2a326cd41f05c82b68f05e69f7f
22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
000000e9a3fb5eb7e66aa7ae68500000
d62024c1b1bc333a769af7d44f28befa59878588b34357874899af7478379679
bf6837f2a826731e544f5cc4993fceaca652f47c696069cb95e83e5f2a3660d04eeccc2f659c5b510031204ae9f3607b0188ec60d77ae0c2126f2808c81cf605
00
0000000000000000

STEP4: Parsing P2PoW to JSON ...

SUCCESS: P2PoW JSON signed block:

{
  "user_transaction": {
    "block_type": "state",
    "account": "nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg",
    "previous": "F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278",
    "representative": "nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc",
    "balance": "18511011810100000000000000000000",
    "link": "79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1",
    "link_as_account": "nano_1yd63ww31cjq75qwmno3k58wok5i48ugpczzmh8j3wb61qp9fp835zfzanwe",
    "signature": "5DE3B33B503CC2EB206BCFD29ADD24D1E1B6548B5CEAFE73F75F5B10948CEB887CFA6779F86F6690B84DFAF4DC8E7FDD3B0639F560CC9B78D01262CD99EE390A"
  },
  "worker_transaction": {
    "block_type": "state",
    "account": "nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg",
    "previous": "2FC9637C3B2681D03F9167173641869A54F2B2A326CD41F05C82B68F05E69F7F",
    "representative": "nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc",
    "balance": "18510911810100000000000000000000",
    "link": "D62024C1B1BC333A769AF7D44F28BEFA59878588B34357874899AF7478379679",
    "link_as_account": "nano_3oj16m1u5h3m9buboxynbwndxyksiy4rjet5cy5nj8fhgjw5h7msrhxud3sz",
    "signature": "BF6837F2A826731E544F5CC4993FCEACA652F47C696069CB95E83E5F2A3660D04EECCC2F659C5B510031204AE9F3607B0188EC60D77AE0C2126F2808C81CF605"
  }
}

Finally Hello World

```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_parse_block_to_json()</h1>

### Description

Parses a Nano block to JSON

```php
$res = php_c_parse_block_to_json($block);
```

params|type|description
------|----|-----------
**_$block_**|string|Nano block to be parsed to JSON

#### Return value

Formated JSON string

##### Example

Create a file _block2json.php_ and type:

```php
<?php
//tue jun 02 2020 01:58 -03 

   /*
    * EXAMPLE: Parse Nano block to JSON example
    */

   echo "STEP1: Create Nano Block to receive 2.281 Nanos (open block) from link 79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1\n";

   //account_private_key => SECURITY WARNING !!! Private key must be in a safe place. NEVER tell your Private KEY, SEED, Bip39 or Brainwallet to ANYBODY
   $account_private_key = '19B8423A2D010067C03F88A35836967894009D439FDAE79B29CDEA8B06C0062F97A886ECB1EE8BA6B0E455D1419FBEBA367986810CB3220AE0B9F9A585C86779';
   /////////////////////////////////////////////////////////// $account_private_key (KEEP IT SAFE) /////////////////////////////////////////////////////////

   $account             = 'nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg';
   $previous            = 'F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278';
   $representative      = 'nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc';
   $balance             = '16.2300118101';
   $balance_type        = BALANCE_REAL_STRING;
   $value_to_send       = '2.281';
   $value_to_send_type  = VALUE_SEND_RECEIVE_REAL_STRING;
   $destination         = '79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1';
   $direction           = VALUE_TO_RECEIVE;

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

   echo "SUCCESS: Nano block created. Signing the block ...\nSTEP 2:\n";

   try {

      $nano_block_signed = php_c_sign_block($nano_block, null, $account_private_key);

   } catch (Exception $e) {

      echo "Error code in 'php_c_sign_block' ".$e->getCode()."Error message: ".$e->getMessage();
      exit(1);

   }

   echo "SUCCESS\nNano block signed block =>\n";
   echo bin2hex($nano_block_signed);

   echo "\nSTEP3: Calculating work ...\nIt can take a little longer... Wait ...\n";

   try {

      php_c_calculate_work_from_block($nano_block_signed, 4); // 4 threads

   } catch (Exception $e) {

      echo "Error code in 'php_c_calculate_work_from_block' ".$e->getCode()."Error message: ".$e->getMessage();
      exit(1);

   }

   echo "SUCCESS\nNano block signed block and with work =>\n";
   echo bin2hex($nano_block_signed);
   echo "\nSUCCESS: Work done:\n\nNow parsing to JSON ...\nSTEP 4:\n";
   echo php_c_parse_block_to_json($nano_block_signed);

   echo "\n\nFinally Hello World\n";

?>
```

```sh
php block2json.php
```

**Return value**

```sh
STEP1: Create Nano Block to receive 2.281 Nanos (open block) from link 79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1
SUCCESS: Nano block created. Signing the block ...
STEP 2:
SUCCESS
Nano block signed block =>
0000000000000000000000000000000000000000000000000000000000000006
97a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779
f9252d12ec2103cad6b2e7212c617413adc741d16a465452ca90c504d9f2c278
22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
000000e9a44e168ac332b4814c500000
79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1
5de3b33b503cc2eb206bcfd29add24d1e1b6548b5ceafe73f75f5b10948ceb887cfa6779f86f6690b84dfaf4dc8e7fdd3b0639f560cc9b78d01262cd99ee390a
00
0000000000000000
STEP3: Calculating work ...                                                                                                                                                                     
It can take a little longer... Wait ...                                                                                                                                                         
SUCCESS
Nano block signed block and with work =>
0000000000000000000000000000000000000000000000000000000000000006
97a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779
f9252d12ec2103cad6b2e7212c617413adc741d16a465452ca90c504d9f2c278
22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
000000e9a44e168ac332b4814c500000
79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1
5de3b33b503cc2eb206bcfd29add24d1e1b6548b5ceafe73f75f5b10948ceb887cfa6779f86f6690b84dfaf4dc8e7fdd3b0639f560cc9b78d01262cd99ee390a
00
cae98de011f0df7b
SUCCESS: Work done:

Now parsing to JSON ...
STEP 4:
{
  "action": "process",
  "json_block": "true",
  "block": {
    "type": "state",
    "account": "nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg",
    "previous": "F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278",
    "representative": "nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc",
    "balance": "18511011810100000000000000000000",
    "link": "79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1",
    "link_as_account": "nano_1yd63ww31cjq75qwmno3k58wok5i48ugpczzmh8j3wb61qp9fp835zfzanwe",
    "signature": "5DE3B33B503CC2EB206BCFD29ADD24D1E1B6548B5CEAFE73F75F5B10948CEB887CFA6779F86F6690B84DFAF4DC8E7FDD3B0639F560CC9B78D01262CD99EE390A",
    "work": "7BDFF011E08DE9CA"
  }
}

Finally Hello World

```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_generate_block()_

<h1>- php_c_public_key_to_nano_wallet()</h1>

### Description

Parses a public key to Base32 encoded string (Nano Wallet) with prefix

```php
$res = php_c_public_key_to_nano_wallet($public_key, $nano_prefix);
```

params|type|description
------|----|-----------
**_$public_key_**|string|Public key of the block
**_$nano_prefix_**|string|(Optional) Prefix. If ommited then Prefix will be _nano__

#### Return value

Nano wallet (Base32 encoded string with selected prefix);

##### Example 1

```sh
php -r "echo php_c_public_key_to_nano_wallet('79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1');"
```

**Return value**

```sh
nano_1yd63ww31cjq75qwmno3k58wok5i48ugpczzmh8j3wb61qp9fp835zfzanwe
```

##### Example 2

```sh
php -r "echo php_c_public_key_to_nano_wallet('F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278', NANO_PREFIX);"
```

**Return value**

```sh
nano_3yb77nbgraa5sddd7ss37jiqa6xfrx1x4tk8cjbeo6871mez7imr9fr9x4j6
```

##### Example 3

```sh
php -r "echo php_c_public_key_to_nano_wallet('98B5E79DBC175AEFB986036AB2E4ECF3E816B8854A2D53CE80A37A648F5AEC0D', XRB_PREFIX);"
```

**Return value**

```sh
xrb_387owygur7ttxywre1ucpdkgswza4twackjfch9a3autek9oou1fdwtu9knd
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_seed_to_nano_key_pair()</h1>

### Description

Returns a Nano keypair given a Nano SEED

```php
$res = php_c_seed_to_nano_key_pair($seed, $wallet_number, $prefix);
```

params|type|description
------|----|-----------
**_$Nano_**|string|Nano SEED
**_$wallet_number_**|string|Wallet number
**_$prefix_**|string|(Optional) Nano prefix. If ommited then _nano__ prefix is used

#### Return value

JSON string format with wallet and keypair

##### Example 1

```sh
php -r "echo php_c_seed_to_nano_key_pair('00d75b5176b48ccc71d91bcc1d7b90fc2820429b1629b77fd1d5f4c5dcee4f6d', '0');"
```

**Return value**

```sh
{

   "private_key":"289067B1E7E53A18520632B5CEB874D71B02C281B838185ADE4CD729E0E6E5C7",
   "public_key":"0EE36F17F489284FB4C298A8B56B2A6734A0A2D75C1520EEA78D9B0650C7A7A3",
   "wallet_number":"0",
   "wallet":"nano_15q5fwdzb4babyte787apooknssnn4jfgq1o65qch5eu1saehbx5tzb5fmm7"

}
```

##### Example 2

```sh
php -r "echo php_c_seed_to_nano_key_pair('00d75b5176b48ccc71d91bcc1d7b90fc2820429b1629b77fd1d5f4c5dcee4f6d', '0x20', NANO_PREFIX);"
```

**Return value**

```sh
{

   "private_key":"11B43CD23FFC787A6ED6993A3CE96E55CE91626D765CB930487129497483825B",
   "public_key":"6B69991A3A40393EDDEC60E41BE9B36B3FB64F300046090B1852DBDD379B2F4C",
   "wallet_number":"32",
   "wallet":"nano_1tubm6f5ni3s9ugyrr965hnu8tszps9m1148367jinpuunuspdte9wjaowp6"

}
```

##### Example 3

```sh
php -r "echo php_c_seed_to_nano_key_pair('00d75b5176b48ccc71d91bcc1d7b90fc2820429b1629b77fd1d5f4c5dcee4f6d', '027', XRB_PREFIX);"
```

**Return value**

```sh
{

   "private_key":"8F8C322EEE9A4513C486B16DEC1F3531896684EE3DAEC5AF480D43447A9918F2",
   "public_key":"40404148158A9095BC947207D200D1CB555993F9C85823830FEA3A624F49F41C",
   "wallet_number":"23",
   "wallet":"xrb_1i41a763d4nikpybawi9ta1f5ktod8bzmk4r6g3iztjteb9nmx1wfwysurwf"

}
```

**On error**

Throws _MyNanoCEmbeddedException_

    Function [ <internal:mynanoembedded> function php_c_set_account_to_block ] {

      - Parameters [2] {
        Parameter #0 [ <required> &$block ]
        Parameter #1 [ <required> $wallet ]
      }
    }

<h1>- php_c_set_account_to_block()</h1>

### Description

Set/modify an account in a Nano block

```php
php_c_set_account_to_block(&$block, $wallet);
```

params|type|description
------|----|-----------
**_&$block_**|binary|Nano block
**_$wallet_**|string|Wallet (Nano base32 encoded string) or public key

#### Return value

Modified Nano block

##### Example 1

```php
<?php
//tue jun 02 2020 21:07

   /*
    * EXAMPLE1
    */

   echo "STEP1: Create Nano Block to receive 2.281 Nanos (open block) from link 79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1\n";

   $account             = 'nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg';
   $previous            = 'F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278';
   $representative      = 'nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc';
   $balance             = '16.2300118101';
   $balance_type        = BALANCE_REAL_STRING;
   $value_to_send       = '2.281';
   $value_to_send_type  = VALUE_SEND_RECEIVE_REAL_STRING;
   $link                = '79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1';
   $direction           = VALUE_TO_RECEIVE;

   try {

      $nano_block = php_c_generate_block(

                       $account,
                       $previous,
                       $representative,
                       $balance,
                       $balance_type,
                       $value_to_send,
                       $value_to_send_type,
                       $link,
                       $direction

                    );

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   $new_account        = 'xrb_1i41a763d4nikpybawi9ta1f5ktod8bzmk4r6g3iztjteb9nmx1wfwysurwf';

   echo "\nChanging account ".$account." to ".$new_account."\n\n";

   try {

      php_c_set_account_to_block($nano_block, $new_account);

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   echo "Success\nAccount ".$account." changed to ".$new_account."\n\nFinally Hello World !";

?>
```

**Return value**

```sh
STEP1: Create Nano Block to receive 2.281 Nanos (open block) from link 79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1

Changing account nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg to xrb_1i41a763d4nikpybawi9ta1f5ktod8bzmk4r6g3iztjteb9nmx1wfwysurwf

Success
Account nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg changed to xrb_1i41a763d4nikpybawi9ta1f5ktod8bzmk4r6g3iztjteb9nmx1wfwysurwf

Finally Hello World !

# Binary block before
# 0000000000000000000000000000000000000000000000000000000000000006
# 97a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779
# f9252d12ec2103cad6b2e7212c617413adc741d16a465452ca90c504d9f2c278
# 22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
# 000000e9a44e168ac332b4814c500000
# 79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1
# 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
# 00
# 0000000000000000

# Human readable block before (JSON equivalent)
# {
#   "action": "process",
#   "json_block": "true",
#   "block": {
#     "type": "state",
#     "account": "nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg",
#     "previous": "F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278",
#     "representative": "nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc",
#     "balance": "18511011810100000000000000000000",
#     "link": "79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1",
#     "link_as_account": "nano_1yd63ww31cjq75qwmno3k58wok5i48ugpczzmh8j3wb61qp9fp835zfzanwe",
#     "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
#     "work": "0000000000000000"
#   }
# }

# Binary block after
# 0000000000000000000000000000000000000000000000000000000000000006
# 40404148158a9095bc947207d200d1cb555993f9c85823830fea3a624f49f41c
# f9252d12ec2103cad6b2e7212c617413adc741d16a465452ca90c504d9f2c278
# 22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
# 000000e9a44e168ac332b4814c500000
# 79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1
# 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
# 02
# 0000000000000000

# Human readable block after (JSON equivalent)
# {
#   "action": "process",
#   "json_block": "true",
#   "block": {
#     "type": "state",
#     "account": "xrb_1i41a763d4nikpybawi9ta1f5ktod8bzmk4r6g3iztjteb9nmx1wfwysurwf",
#     "previous": "F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278",
#     "representative": "nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc",
#     "balance": "18511011810100000000000000000000",
#     "link": "79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1",
#     "link_as_account": "nano_1yd63ww31cjq75qwmno3k58wok5i48ugpczzmh8j3wb61qp9fp835zfzanwe",
#     "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
#     "work": "0000000000000000"
#   }
# }

```

##### Example 2

```php
<?php
//tue jun 02 2020 21:07

   /*
    * EXAMPLE2
    */

   echo "STEP1: Create Nano Block to receive 2.281 Nanos (open block) from link 79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1\n";

   $account             = 'nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg';
   $previous            = 'F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278';
   $representative      = 'nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc';
   $balance             = '16.2300118101';
   $balance_type        = BALANCE_REAL_STRING;
   $value_to_send       = '2.281';
   $value_to_send_type  = VALUE_SEND_RECEIVE_REAL_STRING;
   $link                = '79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1';
   $direction           = VALUE_TO_RECEIVE;

   try {

      $nano_block = php_c_generate_block(

                       $account,
                       $previous,
                       $representative,
                       $balance,
                       $balance_type,
                       $value_to_send,
                       $value_to_send_type,
                       $link,
                       $direction

                    );

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   $new_account        = 'nano_1nxx3pham5o6ufatmrzzp47raozthsdb3n9xwtfaeic8bgfaw9bhth31qmru';

   echo "\nChanging account ".$account." to ".$new_account."\n\n";

   try {

      php_c_set_account_to_block($nano_block, $new_account);

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   echo "Success\nAccount ".$account." changed to ".$new_account."\n\nFinally Hello World !";

?>
```

**Return value**

```sh
STEP1: Create Nano Block to receive 2.281 Nanos (open block) from link 79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1

Changing account nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg to nano_1nxx3pham5o6ufatmrzzp47raozthsdb3n9xwtfaeic8bgfaw9bhth31qmru

Success
Account nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg changed to nano_1nxx3pham5o6ufatmrzzp47raozthsdb3n9xwtfaeic8bgfaw9bhth31qmru

Finally Hello World !

# Binary block before
# 0000000000000000000000000000000000000000000000000000000000000006
# 97a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779
# f9252d12ec2103cad6b2e7212c617413adc741d16a465452ca90c504d9f2c278
# 22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
# 000000e9a44e168ac332b4814c500000
# 79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1
# 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
# 00
# 0000000000000000

# Human readable block before (JSON equivalent)
# {
#   "action": "process",
#   "json_block": "true",
#   "block": {
#     "type": "state",
#     "account": "nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg",
#     "previous": "F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278",
#     "representative": "nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc",
#     "balance": "18511011810100000000000000000000",
#     "link": "79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1",
#     "link_as_account": "nano_1yd63ww31cjq75qwmno3k58wok5i48ugpczzmh8j3wb61qp9fp835zfzanwe",
#     "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
#     "work": "0000000000000000"
#   }
# }

# Binary block after
# 0000000000000000000000000000000000000000000000000000000000000006
# 53bd0d9e898ea4db51a9e3ffb08b8457fa7e5690d0fde69a8641464b9a8e1d2f
# f9252d12ec2103cad6b2e7212c617413adc741d16a465452ca90c504d9f2c278
# 22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
# 000000e9a44e168ac332b4814c500000
# 79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1
# 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
# 00
# 0000000000000000

# Human readable block after (JSON equivalent)
# {
#  {
#   "action": "process",
#   "json_block": "true",
#   "block": {
#     "type": "state",
#     "account": "nano_1nxx3pham5o6ufatmrzzp47raozthsdb3n9xwtfaeic8bgfaw9bhth31qmru",
#     "previous": "F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278",
#     "representative": "nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc",
#     "balance": "18511011810100000000000000000000",
#     "link": "79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1",
#     "link_as_account": "nano_1yd63ww31cjq75qwmno3k58wok5i48ugpczzmh8j3wb61qp9fp835zfzanwe",
#     "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
#     "work": "0000000000000000"
#   }
# }
```

##### Example 3

```php
<?php
//tue jun 02 2020 21:07

   /*
    * EXAMPLE3
    */

   echo "STEP1: Create Nano Block to receive 2.281 Nanos (open block) from link 79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1\n";

   $account             = 'nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg';
   $previous            = 'F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278';
   $representative      = 'nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc';
   $balance             = '16.2300118101';
   $balance_type        = BALANCE_REAL_STRING;
   $value_to_send       = '2.281';
   $value_to_send_type  = VALUE_SEND_RECEIVE_REAL_STRING;
   $link                = '79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1';
   $direction           = VALUE_TO_RECEIVE;

   try {

      $nano_block = php_c_generate_block(

                       $account,
                       $previous,
                       $representative,
                       $balance,
                       $balance_type,
                       $value_to_send,
                       $value_to_send_type,
                       $link,
                       $direction

                    );

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   $new_account        = '51BD5E2C122A7D505838A2165338BDCE48940B1E66AE0682799EFD39BD7DD618';

   echo "\nChanging account ".$account." to ".$new_account."\n\n";

   try {

      php_c_set_account_to_block($nano_block, $new_account);

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   echo "Success\nAccount ".$account." changed to ".$new_account."\n\nFinally Hello World !";

?>
```

**Return value**

```sh
STEP1: Create Nano Block to receive 2.281 Nanos (open block) from link 79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1

Changing account nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg to 51BD5E2C122A7D505838A2165338BDCE48940B1E66AE0682799EFD39BD7DD618

Success
Account nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg changed to 51BD5E2C122A7D505838A2165338BDCE48940B1E66AE0682799EFD39BD7DD618

Finally Hello World !


# Binary block before
# 0000000000000000000000000000000000000000000000000000000000000006
# 97a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779
# f9252d12ec2103cad6b2e7212c617413adc741d16a465452ca90c504d9f2c278
# 22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
# 000000e9a44e168ac332b4814c500000
# 79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1
# 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
# 00
# 0000000000000000

# Human readable block before (JSON equivalent)
# {
#   "action": "process",
#   "json_block": "true",
#   "block": {
#     "type": "state",
#     "account": "nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg",
#     "previous": "F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278",
#     "representative": "nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc",
#     "balance": "18511011810100000000000000000000",
#     "link": "79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1",
#     "link_as_account": "nano_1yd63ww31cjq75qwmno3k58wok5i48ugpczzmh8j3wb61qp9fp835zfzanwe",
#     "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
#     "work": "0000000000000000"
#   }
# }

# Binary block after
# 0000000000000000000000000000000000000000000000000000000000000006
# 51bd5e2c122a7d505838a2165338bdce48940b1e66ae0682799efd39bd7dd618
# f9252d12ec2103cad6b2e7212c617413adc741d16a465452ca90c504d9f2c278
# 22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
# 000000e9a44e168ac332b4814c500000
# 79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1
# 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
# 00
# 0000000000000000

# Human readable block after (JSON equivalent)
# {
#   "action": "process",
#   "json_block": "true",
#   "block": {
#     "type": "state",
#     "account": "nano_1nfxdrp36cmxc3e5jaipcewdumkaki7jwsog1t39m9qx98yquoirow9mb1ad",
#     "previous": "F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278",
#     "representative": "nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc",
#     "balance": "18511011810100000000000000000000",
#     "link": "79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1",
#     "link_as_account": "nano_1yd63ww31cjq75qwmno3k58wok5i48ugpczzmh8j3wb61qp9fp835zfzanwe",
#     "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
#     "work": "0000000000000000"
#   }
# }
```

**On error**

Throws _MyNanoCEmbeddedException_

<h1>- php_c_set_balance()</h1>

### Description

Set/modify an account balance

```php
php_c_set_balance(&$block, $balance, $balance_type);
```

params|type|description
------|----|-----------
**_&$block_**|binary|Nano block
**_$balance_**|string|Nano big number balance
**_$balance_type_**|integer|Balance type (See below)

**_$balance_type_** type|description
------------------------|-----------
**BALANCE_REAL_STRING**|Real string value
**BALANCE_RAW_STRING**|Raw string value
**BALANCE_RAW_128**|Hex string value

#### Return value

Nano block reference **_&$block_** with modified balance

##### Example

```php
// Assuming $block1, $block2 and $block3 variables are already created
php_c_set_balance($block1, '12702.18726458194', BALANCE_REAL_STRING); // Assigns real value 12702.18726458194 to $block1
php_c_set_balance($block2, '254000000000000000000000000000000', BALANCE_RAW_STRING); // Assigns raw value (254) to $block2
php_c_set_balance($block3, '000011d126edc439aee12bdec7800000', BALANCE_RAW_128); // Assigns hex value (361.3716971) to $block3
```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_get_balance_from_block()_

<h1>- php_c_set_link_to_block()</h1>

### Description

Set/modify a link or Nano account

```php
php_c_set_link_to_block(&$block, $link);
```

params|type|description
------|----|-----------
**_&$block_**|binary|Nano block
**_$link_**|string|Nano link or Nano account (Base32 encoded string)

#### Return value

Nano block reference **_&$block_** with modified link or Nano account

##### Example

```php
// Assuming $block1, $block2 and $block3 variables are already created
php_c_set_link_to_block($block1, 'E0AF835D2257133F507DE787728ABB48C644E950BB7894CB822A5768E01F91D2'); // Assigns link to $block1
php_c_set_link_to_block($block2, 'nano_3bgfqdzh6kcpysiqczsiox6zufnj7bdtqndt9e4wgbjo4pdwp7irdrnz5inm'); // Assigns Nano account to $block2
php_c_set_link_to_block($block3, 'xrb_3p4cc397w9zqz8otcft181wm9utrz94kc9xku5fu1wh7p43h1cpk7pju3ebs'); // Assigns Nano account to $block3
```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_get_link_from_block()_

<h1>- php_c_set_prefixes()</h1>

### Description

Set/modifies Block wallets prefixes

```php
php_c_set_prefixes(&$block, $prefixes);
```

params|type|description
------|----|-----------
**_&$block_**|binary|Nano block
**_$prefixes_**|integer|Prefixes 

#### Return value

Nano block reference **_&$block_** with modified prefix(es)

##### Example

```php
// Assuming $block1, $block2, $block3 and $block4 variables are already created
php_c_set_prefixes($block1, REP_XRB); // Changes representative prefix _nano__ to _xrb__ in $block1
php_c_set_prefixes($block2, SENDER_XRB); // Changes sender (account) prefix _nano__ to _xrb__ in $block2
php_c_set_prefixes($block3, DEST_XRB|REP_XRB); // Changes destination and representative prefixes _nano__ to _xrb__ in $block3
php_c_set_prefixes($block1, 0); // Changes all wallets (account, representative and destination) to _nano__ prefixes in $block1
```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_get_prefixes_from_block()_

<h1>- php_c_set_previous()</h1>

### Description

Set/modify a previous hash in Nano Block

```php
php_c_set_previous(&$block, $previous);
```

params|type|description
------|----|-----------
**_&$block_**|binary|Nano block
**_$previous_**|string|Previous block

#### Return value

Nano block reference **_&$block_** with modified previous hash

##### Example

```php
// Assuming $block1 is already created
php_c_set_previous($block1, 'E2455BE7630528084F3B43AFE7F65335D6FEEF88798BE717523979DE4B93C28F'); // Assigns previous hash to $block1
```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_get_previous_from_block()_

<h1>- php_c_set_representative_to_block()</h1>

```sh
    Function [ <internal:mynanoembedded> function php_c_set_representative_to_block ] {

      - Parameters [2] {
        Parameter #0 [ <required> &$block ]
        Parameter #1 [ <required> $representative ]
      }
    }
```

### Description

Set/modify a representative Nano account or public key in Nano block

```php
php_c_set_representative_to_block(&$block, $representative);
```

params|type|description
------|----|-----------
**_&$block_**|binary|Nano block
**_$representative_**|string|Nano representative coded in Base32 or representative public key

#### Return value

Nano block reference **_&$block_** with modified representative account

##### Example

```php
// Assuming $block1, $block2 and $block3 variables are already created
php_c_set_representative_to_block($block1, '3AFA0DF128384B227CBD319C1D2F794A2B5097306B1CCB9412E113317D2C512A'); // Assigns representative to $block1
php_c_set_representative_to_block($block2, 'nano_396sch48s3jmzq1bk31pxxpz64rn7joj38emj4ueypkb9p9mzrym34obze6c'); // Assigns Nano account representative to $block2
php_c_set_representative_to_block($block3, 'xrb_3rw4un6ys57hrb39sy1qx8qy5wukst1iiponztrz9qiz6qqa55kxzx4491or'); // Assigns Nano account representative to $block3
```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_get_representative_from_block()_

<h1>- php_c_set_signature()</h1>

```sh
    Function [ <internal:mynanoembedded> function php_c_set_signature ] {

      - Parameters [2] {
        Parameter #0 [ <required> &$block ]
        Parameter #1 [ <required> $signature ]
      }
    }
```

### Description

Set/modify a signature to a Nano block

```php
php_c_set_signature(&$block, $signature);
```

params|type|description
------|----|-----------
**_&$block_**|binary|Nano block
**_$signature_**|string|Signature to be assigned in Nano block

#### Return value

Nano block reference **_&$block_** with modified signature

##### Example

```php
// Assuming $block1 is already created
php_c_set_signature($block1, '2C67CCE89396C62A1D8ACCDD27478DF27FC2180A10CFB8866B5B4EB14BEE5FD9D431FCD13B59DF28674571FF128080C770890B3E26CC2943308A9E4C87F9B004'); // Assigns signature to $block1
```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_get_signature_from_block()_

<h1>- php_c_set_work()</h1>

```sh
    Function [ <internal:mynanoembedded> function php_c_set_work ] {

      - Parameters [2] {
        Parameter #0 [ <required> &$block ]
        Parameter #1 [ <required> $work ]
      }
    }
```

### Description

Set/modify work in Nano Block

```php
php_c_set_work(&$block, $work);
```

params|type|description
------|----|-----------
**_&$block_**|binary|Nano block
**_$work_**|string|String long value

#### Return value

Nano block reference **_&$block_** with modified work

##### Example

```php
// Assuming $block1, $block2 and $block3 variables are already created
php_c_set_work($block1, '0xf91404332afb3c7e'); // Assigns work value 0xf91404332afb3c7e to $block1
```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_get_work_from_block()_

<h1>- php_c_sign_block()</h1>

```sh
    Function [ <internal:mynanoembedded> function php_c_sign_block ] {

      - Parameters [3] {
        Parameter #0 [ <required> $user_block ]
        Parameter #1 [ <required> $fee_block ]
        Parameter #2 [ <required> $private_key ]
      }
    }
```

### Description

- Function 1: Takes a Nano Block and signs with the _private_key_ and returns a new variable with signed Nano Block
- Function 2: Takes a Nano Block and a second fee Block and signs with the private key and returns a _P2POW_ signed block variable

```php
php_c_sign_block($user_block, $fee_block, $private_key);
```

params|type|description
------|----|-----------
**_$user_block_**|binary|Input user Nano block
**_$fee_block_**|binary|Input fee Nano block. If _null_ then function returns only signed Nano block, else returns P2PoW block
**_$private_key_**|string|Private key

#### Return value

Signed Nano block or signed P2PoW block

##### Example 1

```php
<?php
//mon jun 08 2020 21:17:14 -03 

   /*
    * EXAMPLE 1: Prepares a block to send (receive 117.2718 Nanos) to xrb_3dq4ar8q8miufrfc3h5omtssfe7setpd6uzafp39d5jiqdd7zghktgqjhqde
    */

   echo "Create Nano Block to send 117.2718 Nanos to wallet xrb_3dq4ar8q8miufrfc3h5omtssfe7setpd6uzafp39d5jiqdd7zghktgqjhqde\n";

   // Private Key. Keep it in a safe place
   $private_key           = 'EBC79E9DA540D6F4D43C94C2353A83907715BC02A333C986B47863D165D1D861737D687273EDBD69A79240A595D93A3A703FB7C25CA8AFBA6891BB5E946A2BAF';

   $account               = 'nano_1wuxf3s99ufxf8ms6i77kqemngmi9yuw6q7aoyx8j6fudtc8ncxhkb9ty31t';
   $previous              = '7D77FABE00D9B6737D82D50A14D8F304CFF88E92C93FB4EF87A63EF6B8BFA0B6';
   $representative        = 'nano_3ph9in8bb9k4byej3pqkgkinwewnrwdoj6cksikxeappqwhugwc8ebrf7y8p';
   $balance               = '2200.10019711029838738198836102';
   $balance_type          = BALANCE_REAL_STRING;
   $value_to_send         = '117.2718';
   $value_to_send_type    = VALUE_SEND_RECEIVE_REAL_STRING;
   $destination           = 'xrb_3dq4ar8q8miufrfc3h5omtssfe7setpd6uzafp39d5jiqdd7zghktgqjhqde';
   $direction             = VALUE_TO_SEND;

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

   echo "Successfully block stored in memory in \$nano_block variable\n";
   echo "Signing block ...\n";

   try {

      $signed_nano_block = php_c_sign_block(

                             $nano_block,
                             null,
                             $private_key

                         );

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   echo "Signed block successfully\n\n";
?>
```

**Return value**

```sh
Create Nano Block to send 117.2718 Nanos to wallet xrb_3dq4ar8q8miufrfc3h5omtssfe7setpd6uzafp39d5jiqdd7zghktgqjhqde
Successfully block stored in memory in $nano_block variable
Signing block ...
Signed block successfully

# Binary signed Nano Block block result representation in Memory (249 Bytes long)

# 0000000000000000000000000000000000000000000000000000000000000006
# 737d687273edbd69a79240a595d93a3a703fb7c25ca8afba6891bb5e946a2baf
# 7d77fabe00d9b6737d82d50a14d8f304cff88e92c93fb4ef87a63ef6b8bfa0b6
# d9e7850c949e424f9910daf274a14e3394c717589152cc25d622d6bf1fb77146
# 000066b0fd855d5252a716a1c0cca260
# aee2460d734e1b6e1aa0bc759eb396b0b966acb26fe86d82758e30bad65fb9f2
# bde3c973b540cc6575ef99a967184bd6285b6c532d4a8e6fd0259661d8e0d21b0ed0f237f6a9e38f312415a8e7b7e26a0280cb2deefb93b904f6105f99968209
# 01
# 0000000000000000

#Human readable result (JSON Equivalent)

#  {
#    "action": "process",
#    "json_block": "true",
#    "block": {
#      "type": "state",
#      "account": "nano_1wuxf3s99ufxf8ms6i77kqemngmi9yuw6q7aoyx8j6fudtc8ncxhkb9ty31t",
#      "previous": "7D77FABE00D9B6737D82D50A14D8F304CFF88E92C93FB4EF87A63EF6B8BFA0B6",
#      "representative": "nano_3ph9in8bb9k4byej3pqkgkinwewnrwdoj6cksikxeappqwhugwc8ebrf7y8p",
#      "balance": "2082828397110298387381988361020000",
#      "link": "AEE2460D734E1B6E1AA0BC759EB396B0B966ACB26FE86D82758E30BAD65FB9F2",
#      "link_as_account": "xrb_3dq4ar8q8miufrfc3h5omtssfe7setpd6uzafp39d5jiqdd7zghktgqjhqde",
#      "signature": "BDE3C973B540CC6575EF99A967184BD6285B6C532D4A8E6FD0259661D8E0D21B0ED0F237F6A9E38F312415A8E7B7E26A0280CB2DEEFB93B904F6105F99968209",
#      "work": "0000000000000000"
#    }
#  }

```

## Example 2

```php
<?php
//mon jun 08 2020 21:41 -03 

   /*
    * EXAMPLE 2: Prepares a block to send 117.2718 Nanos to xrb_3dq4ar8q8miufrfc3h5omtssfe7setpd6uzafp39d5jiqdd7zghktgqjhqd
    * with fee 0.0025 to worker wallet nano_3gqw3xj3k3pdcbt7agkawxjhjwxcjku68dcearr8hf9e779c4fkncabcxbdd
    * Using php_c_generate_block() to create signed p2pow block is not recommended due to code efficiency.
    *
    * Please, use php_c_block_to_p2pow() and php_c_sign_p2pow_block() instead
    */

   echo "Create Nano Block to send 117.2718 Nanos to wallet nano_3ext7q1a41teoezpewstucbts611a6gk7q5g69xgxn753kdcudurr91y999w\n";
   echo "with fee 0.00025 to worker wallet nano_3gqw3xj3k3pdcbt7agkawxjhjwxcjku68dcearr8hf9e779c4fkncabcxbdd\n\n";

   // Private Key. Keep it in a safe place
   $private_key           = '943CE14F9735244385B34ACFE82F9868E0F46B21C4B35D4D7D142CC784D3810877871ED613AE5E89CAB6534BBC60BC50BCB61302E29AADF4BF0F48684BA8F5DB';

   $account               = 'xrb_1xw95ud39dkyj97dentdqjidrn7wprbi7rntoqtdy5taf37tjxgu3ds1reop';
   $previous              = '7D77FABE00D9B6737D82D50A14D8F304CFF88E92C93FB4EF87A63EF6B8BFA0B6';
   $representative        = 'nano_3ph9in8bb9k4byej3pqkgkinwewnrwdoj6cksikxeappqwhugwc8ebrf7y8p';
   $balance               = '2200.10019711029838738198836102';
   $balance_type          = BALANCE_REAL_STRING;
   $value_to_send         = '117.2718';
   $value_to_send_type    = VALUE_SEND_RECEIVE_REAL_STRING;
   $destination           = 'xrb_3dq4ar8q8miufrfc3h5omtssfe7setpd6uzafp39d5jiqdd7zghktgqjhqde';
   $direction             = VALUE_TO_SEND;

   // Creating user block

   echo "Creating user block ...\n";

   try {

      $user_block = php_c_generate_block(

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

   echo "Successfully block stored in memory in \$user_block variable\n";
   echo "Subtracting \$balance and \$value_to_send in previous block\n";


   try {

      // $new_balance = $balance - $value_to_send
      $new_balance = php_c_add_sub_balance($balance, $value_to_send, NANO_SUB_A_B|NANO_RES_RAW_128|NANO_A_REAL_STRING|NANO_B_REAL_STRING);

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }


   echo "Creating worker fee block ...\n";

   $worker_fee          = '0.0025';
   $worker_fee_type     = VALUE_SEND_RECEIVE_REAL_STRING;
   $worker_destination  = 'nano_3gqw3xj3k3pdcbt7agkawxjhjwxcjku68dcearr8hf9e779c4fkncabcxbdd';

   try {

      $worker_block = php_c_generate_block(

                       $account,
                       $previous,
                       $representative,
                       $new_balance,
                       BALANCE_RAW_128,
                       $worker_fee,
                       $worker_fee_type,
                       $worker_destination,
                       $direction

                    );

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   echo "Signing P2PoW block...\n";

   try {

      $signed_p2pow_block = php_c_sign_block(

                               $user_block,
                               $worker_block,
                               $private_key

                            );

   } catch (Exception $e) {

      echo 'Error code: '.$e->getCode()."\nError message: ".$e->getMessage();
      exit(1);

   }

   echo "P2PoW block signed successfully\n\n";
?>
```

**Return value**

```sh
Create Nano Block to send 117.2718 Nanos to wallet nano_3ext7q1a41teoezpewstucbts611a6gk7q5g69xgxn753kdcudurr91y999w
with fee 0.00025 to worker wallet nano_3gqw3xj3k3pdcbt7agkawxjhjwxcjku68dcearr8hf9e779c4fkncabcxbdd

Creating user block ...
Successfully block stored in memory in $user_block variable
Subtracting $balance and $value_to_send in previous block
Creating worker fee block ...
Signing P2PoW block...
P2PoW block signed successfully

# Binary signed Nano Block block result representation in Memory (498 Bytes long)

# 0000000000000000000000000000000000000000000000000000000000000006
# 77871ed613ae5e89cab6534bbc60bc50bcb61302e29aadf4bf0f48684ba8f5db
# 7d77fabe00d9b6737d82d50a14d8f304cff88e92c93fb4ef87a63ef6b8bfa0b6
# d9e7850c949e424f9910daf274a14e3394c717589152cc25d622d6bf1fb77146
# 000066b0fd855d5252a716a1c0cca260
# aee2460d734e1b6e1aa0bc759eb396b0b966acb26fe86d82758e30bad65fb9f2
# 21612873f05eed303d91926f861ee9cf4d87eec3c4864c4b6e39f87ca24833c534a4f3cb68d474725fdffc39352c49eaca58f7351892de4ad5e6fd03bbafdf03
# 03
# 0000000000000000
# 0000000000000000000000000000000000000000000000000000000000000006
# 77871ed613ae5e89cab6534bbc60bc50bcb61302e29aadf4bf0f48684ba8f5db
# 0c453e8dd551635d0b5d36a83e88eb5aec2c783e08224fac338ff2f057863450
# d9e7850c949e424f9910daf274a14e3394c717589152cc25d622d6bf1fb77146
# 000066b0f57169bac31dd6097ccca260
# bafc0f621906cb5274543a48e762f8f3aa8cb6432d4c463067b4ec294ea13654
# cd376ddbce5fcc2a9cf1978f720da004bd3ad06bbb9ff9097a048e1c801d099999ca034a717218c9750e3876fa0c5b791e8db0b88eb1a8f1854cea951a32bc09
# 02
# 0000000000000000

#Human readable result (JSON Equivalent)

#  {
#    "user_transaction": {
#      "block_type": "state",
#      "account": "xrb_1xw95ud39dkyj97dentdqjidrn7wprbi7rntoqtdy5taf37tjxgu3ds1reop",
#      "previous": "7D77FABE00D9B6737D82D50A14D8F304CFF88E92C93FB4EF87A63EF6B8BFA0B6",
#      "representative": "nano_3ph9in8bb9k4byej3pqkgkinwewnrwdoj6cksikxeappqwhugwc8ebrf7y8p",
#      "balance": "2082828397110298387381988361020000",
#      "link": "AEE2460D734E1B6E1AA0BC759EB396B0B966ACB26FE86D82758E30BAD65FB9F2",
#      "link_as_account": "xrb_3dq4ar8q8miufrfc3h5omtssfe7setpd6uzafp39d5jiqdd7zghktgqjhqde",
#      "signature": "21612873F05EED303D91926F861EE9CF4D87EEC3C4864C4B6E39F87CA24833C534A4F3CB68D474725FDFFC39352C49EACA58F7351892DE4AD5E6FD03BBAFDF03"
#    },
#    "worker_transaction": {
#      "block_type": "state",
#      "account": "xrb_1xw95ud39dkyj97dentdqjidrn7wprbi7rntoqtdy5taf37tjxgu3ds1reop",
#      "previous": "0C453E8DD551635D0B5D36A83E88EB5AEC2C783E08224FAC338FF2F057863450",
#      "representative": "nano_3ph9in8bb9k4byej3pqkgkinwewnrwdoj6cksikxeappqwhugwc8ebrf7y8p",
#      "balance": "2082825897110298387381988361020000",
#      "link": "BAFC0F621906CB5274543A48E762F8F3AA8CB6432D4C463067B4EC294EA13654",
#      "link_as_account": "nano_3gqw3xj3k3pdcbt7agkawxjhjwxcjku68dcearr8hf9e779c4fkncabcxbdd",
#      "signature": "CD376DDBCE5FCC2A9CF1978F720DA004BD3AD06BBB9FF9097A048E1C801D099999CA034A717218C9750E3876FA0C5B791E8DB0B88EB1A8F1854CEA951A32BC09"
#    }
#  }

```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_block_to_p2pow()_
- _php_c_sign_p2pow_block()_


<h1>- php_c_sign_p2pow_block()</h1>

```sh
    Function [ <internal:mynanoembedded> function php_c_sign_p2pow_block ] {

      - Parameters [2] {
        Parameter #0 [ <required> &$p2pow_block ]
        Parameter #1 [ <required> $private_key ]
      }
    }
```

### Description

- Signs a P2PoW block with a given private key

```php
php_c_sign_p2pow_block(&$p2pow_block, $private_key);
```

params|type|description
------|----|-----------
**_&$p2pow_block_**|binary|Input user P2PoW block
**_$private_key_**|string|Private key to sign P2PoW block

#### Return value

Signs reference _$p2pow_block_ with private key _$private_key_

##### Example

Create a file _p2pow2_sign.php_ and type:

```php
<?php
//mon jun 01 2020 15:24:27 -03 

   /*
    * EXAMPLE: Sign P2PoW example
    */

   echo "STEP1: Create Nano Block to receive 2.281 Nanos (open block) from link 79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1\n";

   //account_private_key => SECURITY WARNING !!! Private key must be in a safe place. NEVER tell your Private KEY, SEED, Bip39 or Brainwallet to ANYBODY
   $account_private_key = '19B8423A2D010067C03F88A35836967894009D439FDAE79B29CDEA8B06C0062F97A886ECB1EE8BA6B0E455D1419FBEBA367986810CB3220AE0B9F9A585C86779';
   /////////////////////////////////////////////////////////// $account_private_key (KEEP IT SAFE) /////////////////////////////////////////////////////////

   $account             = 'nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg';
   $previous            = 'F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278';
   $representative      = 'nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc';
   $balance             = '16.2300118101';
   $balance_type        = BALANCE_REAL_STRING;
   $value_to_send       = '2.281';
   $value_to_send_type  = VALUE_SEND_RECEIVE_REAL_STRING;
   $destination         = '79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1';
   $direction           = VALUE_TO_RECEIVE;

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

   echo "SUCCESS: Nano block created. Now adding fee to Nano block ...\nSTEP 2:\n";

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

   echo "\nSTEP3: Signing your P2PoW block with private keypair ...\n";

   try {

      php_c_sign_p2pow_block($worker_fee_block, $account_private_key);

   } catch (Exception $e) {

      echo "Error code in 'php_c_sign_p2pow_block' ".$e->getCode()."Error message: ".$e->getMessage();
      exit(1);

   }

   echo "SUCCESS\nP2PoW Fee block signed block =>\n";
   echo bin2hex($worker_fee_block);

   echo "\nSTEP4: Parsing P2PoW to JSON ...\n";

   try {

      $p2pow_to_json = php_c_p2pow_to_json($worker_fee_block);

   } catch (Exception $e) {

      echo "Error code in 'php_c_p2pow_to_json' ".$e->getCode()."Error message: ".$e->getMessage();
      exit(1);

   }

   echo "\nSUCCESS: P2PoW JSON signed block:\n\n";

   echo $p2pow_to_json;
   echo "\n\nFinally Hello World\n";

?>

```

```sh
php p2pow2_sign.php
```

**Return value**

```sh
STEP1: Create Nano Block to receive 2.281 Nanos (open block) from link 79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1
SUCCESS: Nano block created. Now adding fee to Nano block ...
STEP 2:

STEP3: Signing your P2PoW block with private keypair ...
SUCCESS
P2PoW Fee block signed block =>
0000000000000000000000000000000000000000000000000000000000000006
97a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779
f9252d12ec2103cad6b2e7212c617413adc741d16a465452ca90c504d9f2c278
22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
000000e9a44e168ac332b4814c500000
79640f38102a3728efc9d2a190cdcac87011b6eb2bff9bcd10f12405ec76d8c1
5de3b33b503cc2eb206bcfd29add24d1e1b6548b5ceafe73f75f5b10948ceb887cfa6779f86f6690b84dfaf4dc8e7fdd3b0639f560cc9b78d01262cd99ee390a
00
0000000000000000
0000000000000000000000000000000000000000000000000000000000000006
97a886ecb1ee8ba6b0e455d1419fbeba367986810cb3220ae0b9f9a585c86779
2fc9637c3b2681d03f9167173641869a54f2b2a326cd41f05c82b68f05e69f7f
22f2c23d07f7eb43ebdb470e35493ebbadfdc447bd4b983623703767728974b6
000000e9a3fb5eb7e66aa7ae68500000
d62024c1b1bc333a769af7d44f28befa59878588b34357874899af7478379679
bf6837f2a826731e544f5cc4993fceaca652f47c696069cb95e83e5f2a3660d04eeccc2f659c5b510031204ae9f3607b0188ec60d77ae0c2126f2808c81cf605
00
0000000000000000

STEP4: Parsing P2PoW to JSON ...

SUCCESS: P2PoW JSON signed block:

{
  "user_transaction": {
    "block_type": "state",
    "account": "nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg",
    "previous": "F9252D12EC2103CAD6B2E7212C617413ADC741D16A465452CA90C504D9F2C278",
    "representative": "nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc",
    "balance": "18511011810100000000000000000000",
    "link": "79640F38102A3728EFC9D2A190CDCAC87011B6EB2BFF9BCD10F12405EC76D8C1",
    "link_as_account": "nano_1yd63ww31cjq75qwmno3k58wok5i48ugpczzmh8j3wb61qp9fp835zfzanwe",
    "signature": "5DE3B33B503CC2EB206BCFD29ADD24D1E1B6548B5CEAFE73F75F5B10948CEB887CFA6779F86F6690B84DFAF4DC8E7FDD3B0639F560CC9B78D01262CD99EE390A"
  },
  "worker_transaction": {
    "block_type": "state",
    "account": "nano_37xaiupd5undntrgaogja8huxgjph85a457m6a7g3ghsnp4wisusx1mqkigg",
    "previous": "2FC9637C3B2681D03F9167173641869A54F2B2A326CD41F05C82B68F05E69F7F",
    "representative": "nano_1aqkrayihxzdahoxpjrg8o6mxgxfzq46hhcdm1u48w3qexsakx7pzzhjn3fc",
    "balance": "18510911810100000000000000000000",
    "link": "D62024C1B1BC333A769AF7D44F28BEFA59878588B34357874899AF7478379679",
    "link_as_account": "nano_3oj16m1u5h3m9buboxynbwndxyksiy4rjet5cy5nj8fhgjw5h7msrhxud3sz",
    "signature": "BF6837F2A826731E544F5CC4993FCEACA652F47C696069CB95E83E5F2A3660D04EECCC2F659C5B510031204AE9F3607B0188EC60D77AE0C2126F2808C81CF605"
  }
}

Finally Hello World

```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_block_to_p2pow()_
- _php_c_p2pow_to_json()_


Throws _MyNanoCEmbeddedException_

<h1>- php_c_to_multiplier()</h1>

```sh
    Function [ <internal:mynanoembedded> function php_c_to_multiplier ] {

      - Parameters [2] {
        Parameter #0 [ <required> $difficulty ]
        Parameter #1 [ <required> $base_difficulty ]
      }
    }
```

### Description

Takes a difficulty and converts to Nano Proof of Work multiplier

```php
php_c_to_multiplier($difficulty, $base_difficulty);
```

params|type|description
------|----|-----------
**_$difficulty_**|string|String value in Hex or Octal or Decimal value
**_$base_difficulty_**|string|String value in Hex or Octal or Decimal value

#### Return value

Rerurns a Real value of a multiplier difficulty of the Proof of Work

##### Examples

```sh
php -r "echo php_c_to_multiplier('0xfffffff000000000', DEFAULT_NANO_POW_THRESHOLD);"
# RETURNS 4
```

```sh
php -r "echo php_c_to_multiplier('0xfffffd5adee9340d', '0xfffff10000000000');"
# RETURNS 5.6710000000011
```

```sh
php -r "echo php_c_to_multiplier('0xb0be377ad92a0800', '0612791712736716625');"
# RETURNS 3.23
```

```sh
php -r "echo php_c_to_multiplier('0xe2f648e16fa3c600', '8212791982736716625');"
# RETURNS 4.891
```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_from_multiplier()_

<h1>- php_c_verify_token()</h1>

```sh
    Function [ <internal:mynanoembedded> function php_c_verify_token ] {

      - Parameters [3] {
        Parameter #0 [ <required> $token ]
        Parameter #1 [ <required> $data ]
        Parameter #2 [ <required> $password ]
      }
    }
```

### Description

Checks if a non deterministic hash _token_ is valid given a _data_ and _password_

```php
php_c_verify_token($token, $data, $password);
```

params|type|description
------|----|-----------
**_$token_**|string|Non deterministic hex string token
**_$data_**|binary|Raw data or string value
**_$password_**|string|Password

#### Return value

Rerurns _TRUE_ if token is valid otherwise returns _FALSE_

##### Example 1

```sh
# Generating a non deterministic HASH with Albert Einstein quote:
# 'Try not to become a man of success, but rather try to become a man of value (Albert Einstein)' and sign with password 'MyPassword@1234'
php -r "echo php_c_generate_token('Try not to become a man of success, but rather try to become a man of value (Albert Einstein)', 'MyPassword@1234');"

#RETURNS 19a13667a8172c809831f2e9820a3c9d

# Verify a non deterministic HASH = 19a13667a8172c809831f2e9820a3c9d with Albert Einstein quote:
# 'Try not to become a man of success, but rather try to become a man of value (Albert Einstein)' and sign with password 'MyPassword@1234'

php -r "echo (php_c_verify_token('19a13667a8172c809831f2e9820a3c9d', 'Try not to become a man of success, but rather try to become a man of value (Albert Einstein)', 'MyPassword@1234'))?'TRUE':'FALSE';";
```

**Return value**

```sh
TRUE
```

**On error**

Throws _MyNanoCEmbeddedException_

**See also**

- _php_c_generate_token()_


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
        Parameter #1 [ <required> $prefixes ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_set_work ] {

      - Parameters [2] {
        Parameter #0 [ <required> &$block ]
        Parameter #1 [ <required> $work ]
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
    Function [ <internal:mynanoembedded> function php_c_bip39_to_nano_key_pair ] {

      - Parameters [4] {
        Parameter #0 [ <required> $bip39 ]
        Parameter #1 [ <required> $dictionary_path ]
        Parameter #2 [ <required> $wallet_number ]
        Parameter #3 [ <optional> $prefix ]
      }
    }
    Function [ <internal:mynanoembedded> function php_c_brainwallet_to_nano_key_pair ] {

      - Parameters [5] {
        Parameter #0 [ <required> $brainwallet ]
        Parameter #1 [ <required> $salt ]
        Parameter #2 [ <required> $mode ]
        Parameter #3 [ <required> $wallet_number ]
        Parameter #4 [ <optional> $prefix ]
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

## DONATIONS

Donation are welcome :)

Coin | Wallet
---- | ------
Bitcoin:   | 1JDckpLRJGhp46LTcjY1vsW19wurZ3L1d5
Nano:      | nano_1cb5fs7xmixqzpitfn9ouy4j1g3hjmdfudc1igt5xhwwps7qdku5htqxmznb
Litecoin:  | LRjEiKadFzPCoGorWvSVUnWPsFyPZGt97f
Dogecoin:  | DRrWWMdwY6AN8rdz7zH2cp3qaK8vSgDTau

## LICENSE

This project is under MIT license see [LICENSE](/LICENSE)

## CONTACT

You can contact me at [fabioegel@gmail.com](mailto:fabioegel@gmail.com) or [fabioegel@protonmail.com](mailto:fabioegel@protonmail.com)

