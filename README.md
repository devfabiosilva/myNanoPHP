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

## SUMMARY: Constants, Functions and Classes

### In console type:

```sh
php --re mynanoembedded
```

### **Result**

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

      - Parameters [3] {
        Parameter #0 [ <required> $valueA ]
        Parameter #1 [ <required> $valueB ]
        Parameter #2 [ <required> $type ]
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

