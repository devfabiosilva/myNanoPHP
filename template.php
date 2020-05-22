<?php
/*
 * AUTHOR: Fábio Pereira da Silva
 * YEAR: 2020
 * LICENSE: MIT
 * EMAIL: fabioegel@gmail.com or fabioegel@protonmail.com
 *
 * Template file that integrates Nano cryptocurrency P2PoW/DPoW support with myNanoEmbedded C library for PHP
 *
 */

/*
  This is a simple template that shows how to use myNanoPHP C library
*/
//sáb 02 mai 2020 01:46:47 -03 

define("DICTIONARY_PATH", "dictionary.dic");

$MIME_TYPE="Content-Type: application/json; charset=utf-8";

if ($_SERVER['REQUEST_METHOD']==='POST') {

    $cmd=$_POST['command'];

    if (!isset($cmd)) {
        http_response_code(404);
        header($MIME_TYPE);
        echo '{"error":"20","reason":"Required: COMMAND"}';
        exit(0);
    }

    if ($cmd==="create_block") {

        $account=$_POST['account'];

        if (!isset($account)) {

           http_response_code(404);
           header($MIME_TYPE);
           echo '{"error":"79","reason":"Missing account"}';

           exit(0);

        }

        $previous=$_POST['previous'];

        if (!isset($previous))
            $previous="";

        $representative=$_POST['representative'];

        if (!isset($representative)) {

           http_response_code(404);
           header($MIME_TYPE);
           echo '{"error":"81","reason":"Missing representative"}';

           exit(0);

        }

        $balance=$_POST['balance'];

        if (!isset($balance)) {

           http_response_code(404);
           header($MIME_TYPE);
           echo '{"error":"82","reason":"Missing balance"}';

           exit(0);

        }

        $balance_type=$_POST['balance_type'];

        if (isset($balance_type)) {

            switch ($balance_type) {

                case "real":
                    $balance_type=BALANCE_REAL_STRING;
                    break;

                case "raw":
                    $balance_type=BALANCE_RAW_STRING;
                    break;

                case "hex":
                    $balance_type=BALANCE_RAW_128;
                    break;

                default:
                    http_response_code(404);
                    header($MIME_TYPE);
                    echo '{"error":"82","reason":"Missing balance type"}';

                    exit(0);

            }

        } else
           $balance_type=BALANCE_REAL_STRING;

        $val_send_rec=$_POST['val_send_rec'];

        if (!isset($val_send_rec)) {

           http_response_code(404);
           header($MIME_TYPE);
           echo '{"error":"83","reason":"Missing value to send/receive"}';

           exit(0);

        }

        $val_send_rec_type=$_POST['val_send_rec_type'];

        if (isset($val_send_rec_type)) {

            switch ($val_send_rec_type) {

                case "real":
                    $val_send_rec_type=VALUE_SEND_RECEIVE_REAL_STRING;
                    break;

                case "raw":
                    $val_send_rec_type=VALUE_SEND_RECEIVE_RAW_STRING;
                    break;

                case "hex":
                    $val_send_rec_type=VALUE_SEND_RECEIVE_RAW_128;
                    break;

                default:
                    http_response_code(404);
                    header($MIME_TYPE);
                    echo '{"error":"86","reason":"Missing send/receive type"}';

                    exit(0);

            }

        } else
           $val_send_rec_type=VALUE_SEND_RECEIVE_REAL_STRING;

        $link=$_POST['link'];

        if (!isset($link)) {

           http_response_code(404);
           header($MIME_TYPE);
           echo '{"error":"84","reason":"Missing link/sender Nano wallet"}';

           exit(0);

        }


        $direction=$_POST['direction'];

        if (isset($direction)) {

            if ($direction==="send")
                $direction=VALUE_TO_SEND;
            else if ($direction==="receive")
                $direction=VALUE_TO_RECEIVE;
            else {

               http_response_code(404);
               header($MIME_TYPE);
               echo '{"error":"86","reason":"Invalid direction. Set only send or receive"}';

               exit(0);

            }

        } else {

           http_response_code(404);
           header($MIME_TYPE);
           echo '{"error":"85","reason":"Missing direction"}';

           exit(0);

        }

        try {

            $block=php_c_generate_block($account, $previous, $representative, $balance, $balance_type, $val_send_rec, $val_send_rec_type, $link, $direction);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not generate Nano block with error in php_c_generate_block function'.$e->getCode().'"}';

            exit(0);

        }

        try {

            $block_hex=bin2hex($block);

            http_response_code(200);
            header($MIME_TYPE);

            echo '{"data":"'.$block_hex.'"}';

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);

            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert binary data to hex string '.$e->getCode().'"}';

        }

        exit(0);

    }

    if ($cmd==="sign_block") {

        $private_key=$_POST['private_key'];

        if (!isset($private_key)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"87","reason":"Missing private key"}';

            exit(0);

        }

        $user_block=$_POST['block'];

        if (!isset($user_block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"88","reason":"Missing user Nano block"}';

            exit(0);

        }

        try {

           $user_block_bin=hex2bin($user_block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert user block hex string to bin '.$e->getCode().'"}';

            exit(0);

        }

        $fee_block=$_POST['fee_block'];

        if (isset($fee_block)) {

            try {

               $fee_block_bin=hex2bin($fee_block);

            } catch (Exception $e) {

                http_response_code(500);
                header($MIME_TYPE);
                echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert fee block hex string to bin '.$e->getCode().'"}';

                exit(0);

            }

        } else
            $fee_block=null;

        try {

            $block=php_c_sign_block($user_block_bin, $fee_block_bin, $private_key);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not sign Nano block(s). Error '.$e->getCode().'"}';

            exit(0);

        }

        try {

            $block_hex=bin2hex($block);

            http_response_code(200);
            header($MIME_TYPE);

            echo '{"data":"'.$block_hex.'"}';

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);

            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert binary data to hex string when signing block(s) '.$e->getCode().'"}';

        }

        exit(0);

    }

    if ($cmd==="verify_sig") {

        $sig=$_POST['sig'];

        if (!isset($sig)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"10","reason":"Missing SIG param"}';
            exit(0);
        }

        $pk=$_POST['pk'];

        if (!isset($pk)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"11","reason":"Missing PK param"}';
            exit(0);
        }

        $hash=$_POST['hash'];

        if (!isset($hash)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"12","reason":"Missing hash param"}';
            exit(0);
        }

        try {

            $ret=php_c_nano_check_sig($sig, $hash , $pk);

            http_response_code(200);
            header($MIME_TYPE);
            echo json_encode(array(
                "error"=>($ret)?"0":"11",
                "reason"=>($ret)?"Success":"Invalid signature",
                "hash"=>$hash,
                "signature"=>$sig,
                "publicKey"=>$pk,
                "validSignature"=>$ret
            ));

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Please, verify your signature length or check if is only hexadecimal ASCII '.$e->getCode().'"}';
            exit(0);
        }

        exit(0);

    }

    if ($cmd==="calculate_pow") {

        if (!isset($_POST['hash'])) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"30","reason":"Missing hash param"}';
            exit(0);
        }

        if (!isset($_POST['num_threads'])) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"31","reason":"Missing number of threads param"}';
            exit(0);
        }

        try {

            (isset($_POST['threshold']))?($pow=php_c_nano_proof_of_work($_POST['hash'], $_POST['num_threads'], $_POST['threshold'])):
                ($pow=php_c_nano_proof_of_work($_POST['hash'], $_POST['num_threads']));

            http_response_code(200);
            header($MIME_TYPE);

            echo json_encode(array(
                "error"=>"0", 
                "reason"=>"Success", 
                "hash"=>$_POST['hash'],
                "result"=>json_decode($pow)
            ));

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' in php_c_nano_proof_of_work function"}';
        }

        exit(0);

    }

    if ($cmd==="verify_work") {

        $hash=$_POST['hash'];

        if (!isset($hash)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"40","reason":"Missing hash param"}';
            exit(0);
        }

        $work=$_POST['work'];

        if (!isset($work)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"41","reason":"Missing work param"}';
            exit(0);
        }

        try {

            $threshold=$_POST['threshold'];

            (isset($threshold))?($val=php_c_nano_verify_work($hash, $work, $threshold)):($val=php_c_nano_verify_work($hash, $work));

            echo json_encode(array(
                "error"=>($val)?"0":"42",
                "reason"=>($val)?"Success":"Fail",
                "hash"=>$_POST['hash'],
                "work"=>$_POST['work'],
                "threshold"=>isset($threshold)?($threshold):DEFAULT_NANO_POW_THRESHOLD,
            ));
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' in php_c_nano_verify_work function"}';
        }

        exit(0);

    }

    if ($cmd==="nano2pk") {

        $wallet=$_POST['wallet'];

        if (!isset($wallet)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"42","reason":"Missing wallet"}';
            exit(0);
        }

        try {

            $pk=php_c_nano_wallet_to_public_key($wallet);

            echo json_encode(array(
                "error"=>"0",
                "reason"=>"Success",
                "wallet"=>$wallet,
                "public_key"=>$pk
            ));
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' in php_c_nano_wallet_to_public_key function.'.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="pk2nano") {

        $pk=$_POST['pk'];

        if (!isset($pk)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"52","reason":"Missing public key"}';
            exit(0);
        }

        $prefix=$_POST['prefix'];

        try {

            (isset($prefix))?$wallet=php_c_public_key_to_nano_wallet($pk, $prefix):$wallet=php_c_public_key_to_nano_wallet($pk);

            echo json_encode(array(
                "error"=>"0",
                "reason"=>"Success",
                "wallet"=>$wallet,
                "public_key"=>$pk
            ));
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' in php_c_public_key_to_nano_wallet function.'.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="get_account_from_block") {

        $block=$_POST['block'];

        if (!isset($block)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"89","reason":"Missing block"}';
            exit(0);
        }

        $type=$_POST['type'];

        if (isset($type)) {

            if ($type==="raw") {

                $number_type=1;
                $prefix="";

            } else if ($type==="wallet") {

                $number_type=0;
                $prefix=$_POST['prefix'];

                if (!isset($prefix))
                    $prefix=NANO_PREFIX;

            }

        } else {

            $number_type=0;
            $prefix=NANO_PREFIX;

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage()." can't parse hex string block to binary block ". $e->getCode().'"}';
        }

        try {

            $ret=php_c_get_account_from_block($block_bin, $number_type, $prefix);

            echo ($number_type)?'{"public_key":"'.$ret.'"}':'{"wallet":"'.$ret.'"}';
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage()." can't extract account from block 'php_c_get_account_from_block' ". $e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="get_representative_from_block") {

        $block=$_POST['block'];

        if (!isset($block)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"89","reason":"Missing block"}';
            exit(0);
        }

        $type=$_POST['type'];

        if (isset($type)) {

            if ($type==="raw") {

                $number_type=1;
                $prefix="";

            } else if ($type==="wallet") {

                $number_type=0;
                $prefix=$_POST['prefix'];

                if (!isset($prefix))
                    $prefix=NANO_PREFIX;

            }

        } else {

            $number_type=0;
            $prefix=NANO_PREFIX;

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage()." can't parse hex string block to binary block ". $e->getCode().'"}';
        }

        try {

            $ret=php_c_get_representative_from_block($block_bin, $number_type, $prefix);

            echo ($number_type)?'{"public_key":"'.$ret.'"}':'{"wallet":"'.$ret.'"}';
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage()." can't extract representative from block 'php_c_get_representative_from_block' ".
                $e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="get_link_from_block") {

        $block=$_POST['block'];

        if (!isset($block)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"89","reason":"Missing block"}';
            exit(0);
        }

        $type=$_POST['type'];

        if (isset($type)) {

            if ($type==="raw") {

                $number_type=1;
                $prefix="";

            } else if ($type==="wallet") {

                $number_type=0;
                $prefix=$_POST['prefix'];

                if (!isset($prefix))
                    $prefix=NANO_PREFIX;

            }

        } else {

            $number_type=0;
            $prefix=NANO_PREFIX;

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage()." can't parse hex string block to binary block ". $e->getCode().'"}';
        }

        try {

            $ret=php_c_get_link_from_block($block_bin, $number_type, $prefix);

            echo ($number_type)?'{"public_key":"'.$ret.'"}':'{"wallet":"'.$ret.'"}';
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage()." can't extract link from block 'php_c_get_link_from_block' ".$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="real2raw") {

        $balance=$_POST['balance'];

        if (!isset($balance)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"53","reason":"Missing real value balance"}';
            exit(0);
        }

        try {

            $ret=php_c_convert_balance($balance, REAL_TO_RAW);

            echo json_encode(array(
                "error"=>"0",
                "reason"=>"Success",
                "balance"=>$balance,
                "raw_balance"=>$ret
            ));
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' in php_c_convert_balance function.'.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="real2hex") {

        $balance=$_POST['balance'];

        if (!isset($balance)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"54","reason":"Missing real value balance"}';
            exit(0);
        }

        try {

            $ret=php_c_convert_balance($balance, REAL_TO_HEX);

            echo json_encode(array(
                "error"=>"0",
                "reason"=>"Success",
                "balance"=>$balance,
                "hex_balance"=>$ret
            ));
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' in php_c_convert_balance function.'.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="raw2real") {

        $balance=$_POST['balance'];

        if (!isset($balance)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"55","reason":"Missing raw value balance"}';
            exit(0);
        }

        try {

            $ret=php_c_convert_balance($balance, RAW_TO_REAL);

            echo json_encode(array(
                "error"=>"0",
                "reason"=>"Success",
                "balance"=>$balance,
                "real_balance"=>$ret
            ));
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' in php_c_convert_balance function.'.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="raw2hex") {

        $balance=$_POST['balance'];

        if (!isset($balance)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"56","reason":"Missing raw value balance"}';
            exit(0);
        }

        try {

            $ret=php_c_convert_balance($balance, RAW_TO_HEX);

            echo json_encode(array(
                "error"=>"0",
                "reason"=>"Success",
                "balance"=>$balance,
                "hex_balance"=>$ret
            ));
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' in php_c_convert_balance function.'.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="hex2real") {

        $balance=$_POST['balance'];

        if (!isset($balance)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"57","reason":"Missing hex value balance"}';
            exit(0);
        }

        try {

            $ret=php_c_convert_balance($balance, HEX_TO_REAL);

            echo json_encode(array(
                "error"=>"0",
                "reason"=>"Success",
                "balance"=>$balance,
                "real_balance"=>$ret
            ));
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' in php_c_convert_balance function.'.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="hex2raw") {

        $balance=$_POST['balance'];

        if (!isset($balance)) {
            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"58","reason":"Missing hex value balance"}';
            exit(0);
        }

        try {

            $ret=php_c_convert_balance($balance, HEX_TO_REAL);

            echo json_encode(array(
                "error"=>"0",
                "reason"=>"Success",
                "balance"=>$balance,
                "raw_balance"=>$ret
            ));
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' in php_c_convert_balance function.'.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="gen_seed") {

       $entropy=$_POST['entropy'];

       if (!isset($entropy)) {
           http_response_code(404);
           header($MIME_TYPE);
           echo '{"error":"59","reason":"Missing entropy type"}';
           exit(0);

       }

       switch ($entropy) {
          case "paranoic":
             $entropy_type=ENTROPY_TYPE_PARANOIC;
             break;

          case "excelent":
              $entropy_type=ENTROPY_TYPE_EXCELENT;
              break;

          case "good":
              $entropy_type=ENTROPY_TYPE_GOOD;
              break;

          case "weak":
              $entropy_type=ENTROPY_TYPE_NOT_ENOUGH;
              break;

          case "very_weak":
              $entropy_type=ENTROPY_TYPE_NOT_RECOMENDED;
              break;

          default:
              http_response_code(404);
              header($MIME_TYPE);
              echo '{"error":"60","reason":"Unknown entropy type \''.$entropy.'\'"}';
              exit(0);

       }

       try {

           $entropy_name=php_c_get_entropy_name($entropy_type);
           $seed=php_c_generate_seed($entropy_type);
           $bip39=php_c_nano_seed_to_bip39($seed, DICTIONARY_PATH);

           echo json_encode(array(
               "error"=>"0",
               "reason"=>"Success",
               "c_iternal_entropy_name"=>$entropy_name,
               "seed_and_bip39"=>array(
                       "seed"=>$seed,
                       "bip39"=>$bip39
                   ),
               "warning"=>"It is not recommended to generate seed outside your hardware. Try to generate seed in your own hardware. Keep your SEED and Bip39 safe!"
           ));
            
       } catch (Exception $e) {
           http_response_code(500);
           header($MIME_TYPE);
           echo '{"error":"500", "reason":"'.$e->getMessage().' when generating seed.'.$e->getCode().'"}';
       }

       exit(0);

    }

    if ($cmd==="seed2bip39") {

       $seed=$_POST['seed'];

       if (!isset($seed)) {
           http_response_code(404);
           header($MIME_TYPE);
           echo '{"error":"60","reason":"Missing Nano SEED"}';
           exit(0);

       }

       try {

           $bip39=php_c_nano_seed_to_bip39($seed, DICTIONARY_PATH);

           echo json_encode(array(
               "error"=>"0",
               "reason"=>"Success",
               "seed"=>$seed,
               "bip39"=>$bip39
           ));
            
       } catch (Exception $e) {
           http_response_code(500);
           header($MIME_TYPE);
           echo '{"error":"500", "reason":"'.$e->getMessage().' when converting Nano SEED to Bip39.'.$e->getCode().'"}';
       }

       exit(0);

    }

    if ($cmd==="bip39_to_seed") {

       $bip39=$_POST['bip39'];

       if (!isset($bip39)) {
           http_response_code(404);
           header($MIME_TYPE);
           echo '{"error":"61","reason":"Missing Bip39 string"}';
           exit(0);

       }

       try {

           $seed=php_c_bip39_to_nano_seed($bip39, DICTIONARY_PATH);

           echo json_encode(array(
               "error"=>"0",
               "reason"=>"Success",
               "seed"=>$seed,
               "bip39"=>$bip39
           ));
       } catch (Exception $e) {
           http_response_code(500);
           header($MIME_TYPE);
           echo '{"error":"500", "reason":"'.$e->getMessage().' when converting Bip39 to Nano SEED.'.$e->getCode().'"}';
       }

       exit(0);

    }

    if ($cmd==="seed2key_pair") {

       $seed=$_POST['seed'];

       if (!isset($seed)) {
           http_response_code(404);
           header($MIME_TYPE);
           echo '{"error":"62","reason":"Missing Nano SEED string"}';
           exit(0);

       }

       $wallet_number=$_POST['wallet_number'];

       if (!isset($wallet_number)) {
           http_response_code(404);
           header($MIME_TYPE);
           echo '{"error":"63","reason":"Missing Nano SEED wallet number"}';
           exit(0);

       }

       try {

           $key_pair=(isset($_POST['prefix']))?php_c_seed_to_nano_key_pair($seed, $wallet_number, $_POST['prefix']):
              php_c_seed_to_nano_key_pair($seed, $wallet_number);

           echo json_encode(array(
               "error"=>"0",
               "reason"=>"Success",
               "key_pair"=>json_decode($key_pair)
           ));
            
       } catch (Exception $e) {
           http_response_code(500);
           header($MIME_TYPE);
           echo '{"error":"500", "reason":"'.$e->getMessage().' when extracting keypair from Nano SEED.'.$e->getCode().'"}';
       }

       exit(0);

    }

    if ($cmd==="add") {

        $valueA=$_POST['valuea'];

        if (!isset($valueA)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"63","reason":"Missing A value to add"}';
            exit(0);

        }

        $valueB=$_POST['valueb'];

        if (!isset($valueB)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"64","reason":"Missing B value to add"}';
            exit(0);

        }

        $type=0;
        $typeA=$_POST['typea'];
        $typeB=$_POST['typeb'];
        $typeR=$_POST['typer'];

        if (!isset($typeA))
            $type=NANO_A_REAL_STRING;
        else if ($typeA==='real')
            $type=NANO_A_REAL_STRING;
        else if ($typeA==='raw')
            $type=NANO_A_RAW_STRING;
        else if ($typeA==='hex')
            $type=NANO_A_RAW_128;

        if (!isset($typeB))
            $type|=NANO_B_REAL_STRING;
        else if ($typeB==='real')
            $type|=NANO_B_REAL_STRING;
        else if ($typeB==='raw')
            $type|=NANO_B_RAW_STRING;
        else if ($typeB==='hex')
            $type|=NANO_B_RAW_128;

        if (!isset($typeR))
            $type|=NANO_RES_REAL_STRING;
        else if ($typeR==='real')
            $type|=NANO_RES_REAL_STRING;
        else if ($typeR==='raw')
            $type|=NANO_RES_RAW_STRING;
        else if ($typeR==='hex')
            $type|=NANO_RES_RAW_128;

        try {

            $res=php_c_add_sub_balance($valueA, $valueB, $type|NANO_ADD_A_B);

            echo json_encode(array(
                "error"=>"0",
                "reason"=>"Success",
                "value_a"=>$valueA,
                "value_b"=>$valueB,
                "result"=>$res
            ));
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' when adding Nano balance A + B.'.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="sub") {

        $valueA=$_POST['valuea'];

        if (!isset($valueA)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"65","reason":"Missing A value to sub"}';
            exit(0);

        }

        $valueB=$_POST['valueb'];

        if (!isset($valueB)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"66","reason":"Missing B value to sub"}';
            exit(0);

        }

        $type=0;
        $typeA=$_POST['typea'];
        $typeB=$_POST['typeb'];
        $typeR=$_POST['typer'];

        if (!isset($typeA))
            $type=NANO_A_REAL_STRING;
        else if ($typeA==='real')
            $type=NANO_A_REAL_STRING;
        else if ($typeA==='raw')
            $type=NANO_A_RAW_STRING;
        else if ($typeA==='hex')
            $type=NANO_A_RAW_128;

        if (!isset($typeB))
            $type|=NANO_B_REAL_STRING;
        else if ($typeB==='real')
            $type|=NANO_B_REAL_STRING;
        else if ($typeB==='raw')
            $type|=NANO_B_RAW_STRING;
        else if ($typeB==='hex')
            $type|=NANO_B_RAW_128;

        if (!isset($typeR))
            $type|=NANO_RES_REAL_STRING;
        else if ($typeR==='real')
            $type|=NANO_RES_REAL_STRING;
        else if ($typeR==='raw')
            $type|=NANO_RES_RAW_STRING;
        else if ($typeR==='hex')
            $type|=NANO_RES_RAW_128;

        try {

            $res=php_c_add_sub_balance($valueA, $valueB, $type|NANO_SUB_A_B);

            echo json_encode(array(
                "error"=>"0",
                "reason"=>"Success",
                "value_a"=>$valueA,
                "value_b"=>$valueB,
                "result"=>$res
            ));
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' when subtracting Nano balance A - B.'.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="compare") {

        $valueA=$_POST['valuea'];

        if (!isset($valueA)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"67","reason":"Missing A value to compare"}';
            exit(0);

        }

        $valueB=$_POST['valueb'];

        if (!isset($valueB)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"68","reason":"Missing B value to add"}';
            exit(0);

        }

        $type=0;
        $typeA=$_POST['typea'];
        $typeB=$_POST['typeb'];

        if (!isset($typeA))
            $type=NANO_A_REAL_STRING;
        else if ($typeA==='real')
            $type=NANO_A_REAL_STRING;
        else if ($typeA==='raw')
            $type=NANO_A_RAW_STRING;
        else if ($typeA==='hex')
            $type=NANO_A_RAW_128;

        if (!isset($typeB))
            $type|=NANO_B_REAL_STRING;
        else if ($typeB==='real')
            $type|=NANO_B_REAL_STRING;
        else if ($typeB==='raw')
            $type|=NANO_B_RAW_STRING;
        else if ($typeB==='hex')
            $type|=NANO_B_RAW_128;

        try {

            $comp=php_c_compare($valueA, $valueB, $type);

            echo json_encode(array(
                "error"=>"0",
                "reason"=>"Success",
                "value_a"=>$valueA,
                "value_b"=>$valueB,
                "result"=>($comp!==NANO_COMPARE_EQ)?($comp===NANO_COMPARE_LT)?"-1":"1":"0"
            ));
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' when comparing Nano balance A with B.'.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="brainwallet") {

        $text=$_POST['text'];

        if (!isset($text)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"69","reason":"Missing brainwallet text"}';
            exit(0);

        }

        $salt=$_POST['salt'];

        if (!isset($salt)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"70","reason":"Missing salt text"}';
            exit(0);

        }

        $mode=$_POST['mode'];
        $mode_tmp=BRAIN_WALLET_PERFECT;

        if (isset($mode)) {

            switch ($mode) {
                case "1":
                    $mode_tmp=BRAIN_WALLET_VERY_POOR;
                    break;

                case "2":
                    $mode_tmp=BRAIN_WALLET_POOR;
                    break;

                case "3":
                    $mode_tmp=BRAIN_WALLET_VERY_BAD;
                    break;

                case "4":
                    $mode_tmp=BRAIN_WALLET_BAD;
                    break;

                case "5":
                    $mode_tmp=BRAIN_WALLET_VERY_WEAK;
                    break;

                case "6":
                    $mode_tmp=BRAIN_WALLET_WEAK;
                    break;

                case "7":
                    $mode_tmp=BRAIN_WALLET_STILL_WEAK;
                    break;

                case "8":
                    $mode_tmp=BRAIN_WALLET_MAYBE_GOOD;
                    break;

                case "9":
                    $mode_tmp=BRAIN_WALLET_GOOD;
                    break;

                case "10":
                    $mode_tmp=BRAIN_WALLET_VERY_GOOD;
                    break;

                case "11":
                    $mode_tmp=BRAIN_WALLET_NICE;
                    break;

                case "12":
                    break;

                default:
                    http_response_code(404);
                    header($MIME_TYPE);
                    echo '{"error":"71","reason":"Invalid brainwallet mode"}';
                    exit(0);
            }

        }

        try {

            $result=php_c_brainwallet_generate($text, $salt, $mode_tmp, DICTIONARY_PATH);

            echo json_encode(array(
                "error"=>"0",
                "reason"=>"Success",
                "text"=>$text,
                "salt"=>$salt,
                "extracted"=> json_decode($result),
                "warning"=>"It is recommended to extract your brainwallet from your own hardware. Keep your brainwallet, seed, bip39 and salt safe."
            ));
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not extract seed from brainwallet'.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="generate_token") {

        $text=$_POST['text'];

        if (!isset($text)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"71","reason":"Missing: Text to sign"}';
            exit(0);

        }

        $passwd=$_POST['passwd'];

        if (!isset($passwd)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"72","reason":"Missing: Password"}';
            exit(0);

        }

        try {

            $result=php_c_generate_token($text, $passwd);

            echo json_encode(array(
                "error"=>"0",
                "reason"=>"Success",
                "text"=>$text,
                "token"=>$result
            ));
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not generate token '.$e->getCode().'"}';
        }


        exit(0);

    }

    if ($cmd==="verify_token") {

        $text=$_POST['text'];

        if (!isset($text)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"73","reason":"Missing: Text to verify"}';
            exit(0);

        }

        $passwd=$_POST['passwd'];

        if (!isset($passwd)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"74","reason":"Missing: Password to verify token"}';
            exit(0);

        }

        $token=$_POST['token'];

        if (!isset($token)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"75","reason":"Missing: Token"}';
            exit(0);

        }

        try {

            $result=php_c_verify_token($token, $text, $passwd);

            echo json_encode(array(
                "error"=>($result)?"0":"76",
                "reason"=>($result)?"Success":"Fail",
                "token"=>$token,
                "text"=>$text,
                "is_valid"=>$result
            ));
            
        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not verify token '.$e->getCode().'"}';
        }


        exit(0);

    }

    if ($cmd==="to_multiplier") {

        $difficulty=$_POST['difficulty'];

        if (!isset($difficulty)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"77","reason":"Missing: Difficulty"}';
            exit(0);

        }

        $base_difficulty=$_POST['base_difficulty'];

        try {

            $result=php_c_to_multiplier($difficulty, (isset($base_difficulty))?$base_difficulty:($base_difficulty=DEFAULT_NANO_POW_THRESHOLD));

            echo '{"multiplier":"'.number_format($result, 15, '.', '').'","difficulty":"'.$difficulty.'","base_difficulty":"'.$base_difficulty.'"}';

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not calculate multiplier'.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="from_multiplier") {

        $multiplier=$_POST['multiplier'];

        if (!isset($multiplier)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"78","reason":"Missing: Multiplier"}';
            exit(0);

        }

        $base_difficulty=$_POST['base_difficulty'];

        try {

            $result=php_c_from_multiplier($multiplier, (isset($base_difficulty))?$base_difficulty:($base_difficulty=DEFAULT_NANO_POW_THRESHOLD));

            echo '{"difficulty":"'.$result.'","multiplier":"'.$multiplier.'","base_difficulty":"'.$base_difficulty.'"}';

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not get difficulty from multiplier '.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="get_previous_from_block") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"90","reason":"Missing: Block"}';
            exit(0);

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            $result=php_c_get_previous_from_block($block_bin);

            echo '{"previous":"'.$result.'"}';

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not get previos from block '.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="get_balance_from_block") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"91","reason":"Missing: Block"}';
            exit(0);

        }

        $type=$_POST['type'];

        if (isset($type)) {

            if ($type==="real")
                $type_sel=BALANCE_REAL_STRING;
            else if ($type==="raw")
                $type_sel=BALANCE_RAW_STRING;
            else if ($type==="hex")
                $type_sel=BALANCE_RAW_128;
            else {

                http_response_code(500);
                header($MIME_TYPE);
                echo '{"error":"92","reason":"Wrong type"}';
                exit(0);

            }

        } else
            $type_sel=BALANCE_REAL_STRING;

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            $result=php_c_get_balance_from_block($block_bin, $type_sel);

            echo '{"balance":"'.$result.'"}';

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not get balance from block '.$e->getCode().'"}';
        }

        exit(0);


    }

    if ($cmd==="get_signature_from_block") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"90","reason":"Missing: Block"}';
            exit(0);

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            $result=php_c_get_signature_from_block($block_bin);

            echo '{"signature":"'.$result.'"}';

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not get signature from block '.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="get_prefixes_from_block") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"90","reason":"Missing: Block"}';
            exit(0);

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            $result=php_c_get_prefixes_from_block($block_bin);

            echo '{"prefixes":"'.$result.'"}';

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not get prefixes from block '.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="get_work_from_block") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"90","reason":"Missing: Block"}';
            exit(0);

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            $result=php_c_get_work_from_block($block_bin);

            echo '{"work":"'.$result.'"}';

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not get work from block '.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="set_account_to_block") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"91","reason":"Missing: Block"}';
            exit(0);

        }

        $account=$_POST['account'];

        if (!isset($account)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"92","reason":"Missing: Account"}';
            exit(0);

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            php_c_set_account_to_block($block_bin, $account);

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not set accont to block '.$e->getCode().'"}';
            exit(0);
        }

        try {

            $block=bin2hex($block_bin);

            echo '{"block":"'.$block.'"}';

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert to bin to hex string'.$e->getCode().'"}';

        }

        exit(0);

    }

    if ($cmd==="set_representative_to_block") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"93","reason":"Missing: Block"}';
            exit(0);

        }

        $representative=$_POST['representative'];

        if (!isset($representative)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"94","reason":"Missing: Representative"}';
            exit(0);

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            php_c_set_representative_to_block($block_bin, $representative);

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not set representative to block '.$e->getCode().'"}';
            exit(0);
        }

        try {

            $block=bin2hex($block_bin);

            echo '{"block":"'.$block.'"}';

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert to bin to hex string'.$e->getCode().'"}';

        }

        exit(0);

    }

    if ($cmd==="set_link_to_block") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"95","reason":"Missing: Block"}';
            exit(0);

        }

        $link=$_POST['link'];

        if (!isset($link)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"96","reason":"Missing: Link"}';
            exit(0);

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            php_c_set_link_to_block($block_bin, $link);

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not set link to block '.$e->getCode().'"}';
            exit(0);
        }

        try {

            $block=bin2hex($block_bin);

            echo '{"block":"'.$block.'"}';

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert to bin to hex string'.$e->getCode().'"}';

        }

        exit(0);

    }

    if ($cmd==="set_previous_to_block") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"101","reason":"Missing: Block"}';
            exit(0);

        }

        $previous=$_POST['previous'];

        if (!isset($previous))
           $previous="";

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            php_c_set_previous($block_bin, $previous);

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not set previous to block '.$e->getCode().'"}';
            exit(0);
        }

        try {

            $block=bin2hex($block_bin);

            echo '{"block":"'.$block.'"}';

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert to bin to hex string'.$e->getCode().'"}';

        }

        exit(0);

    }

    if ($cmd==="set_balance_to_block") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"98","reason":"Missing: Block"}';
            exit(0);

        }

        $balance=$_POST['balance'];

        if (!isset($balance)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"99","reason":"Missing: Balance"}';
            exit(0);

        }

        $type=$_POST['balance_type'];

        if (isset($type)) {

            if ($type==="real")
                $type_sel=BALANCE_REAL_STRING;
            else if ($type==="raw")
                $type_sel=BALANCE_RAW_STRING;
            else if ($type==="hex")
                $type_sel=BALANCE_RAW_128;
            else {

                http_response_code(500);
                header($MIME_TYPE);
                echo '{"error":"100","reason":"Wrong type"}';
                exit(0);

            }

        } else
            $type_sel=BALANCE_REAL_STRING;

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            php_c_set_balance($block_bin, $balance, $type_sel);

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not set balance to block '.$e->getCode().'"}';
            exit(0);
        }

        try {

            $block=bin2hex($block_bin);

            echo '{"block":"'.$block.'"}';

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert to bin to hex string'.$e->getCode().'"}';

        }

        exit(0);

    }

    if ($cmd==="set_signature_to_block") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"98","reason":"Missing: Block"}';
            exit(0);

        }

        $signature=$_POST['signature'];

        if (!isset($signature)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"103","reason":"Missing: Signature"}';
            exit(0);

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            php_c_set_signature($block_bin, $signature);

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not set signature to block '.$e->getCode().'"}';
            exit(0);
        }

        try {

            $block=bin2hex($block_bin);

            echo '{"block":"'.$block.'"}';

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert to bin to hex string'.$e->getCode().'"}';

        }

        exit(0);

    }

    if ($cmd==="set_prefixes_to_block") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"104","reason":"Missing: Block"}';
            exit(0);

        }

        $prefixes=$_POST['prefixes'];

        if (isset($prefixes)) {

           if (is_numeric($prefixes))
               $prefixes=intval($prefixes);
           else {

                http_response_code(500);
                header($MIME_TYPE);
                echo '{"error":"105","reason":"Is not a number"}';
                exit(0);

           }

        } else
           $prefixes=0;

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            php_c_set_prefixes($block_bin, $prefixes);

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not set prefixes to block '.$e->getCode().'"}';
            exit(0);
        }

        try {

            $block=bin2hex($block_bin);

            echo '{"block":"'.$block.'"}';

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert to bin to hex string'.$e->getCode().'"}';

        }

        exit(0);

    }

    if ($cmd==="set_work_to_block") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"106","reason":"Missing: Block"}';
            exit(0);

        }

        $work=$_POST['work'];

        if (!isset($work)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"107","reason":"Missing: Work"}';
            exit(0);

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            php_c_set_work($block_bin, $work);

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not set work to block '.$e->getCode().'"}';
            exit(0);
        }

        try {

            $block=bin2hex($block_bin);

            echo '{"block":"'.$block.'"}';

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert to bin to hex string'.$e->getCode().'"}';

        }

        exit(0);

    }

    if ($cmd==="block_to_json") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"97","reason":"Missing: Block"}';
            exit(0);

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            $res=php_c_parse_block_to_json($block_bin);

            echo $res;

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not parse Nano hex block to JSON'.$e->getCode().'"}';

        }

        exit(0);

    }

    if ($cmd==="block_to_p2pow") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"108","reason":"Missing: Block"}';
            exit(0);

        }

        $worker_wallet=$_POST['wallet'];

        if (!isset($worker_wallet)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"109","reason":"Missing: Worker wallet"}';
            exit(0);

        }

        $worker_representative=$_POST['representative'];

        if (!isset($worker_representative))
            $worker_representative="";

        $worker_fee=$_POST['fee'];

        if (!isset($worker_fee)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"110","reason":"Missing: Worker fee value"}';
            exit(0);

        }

        $worker_fee_type=$_POST['fee_type'];

        if (isset($worker_fee_type)) {

            if ($worker_fee_type==="real")
                $worker_fee_tp=WORKER_FEE_REAL;
            else if ($worker_fee_type==="raw")
                $worker_fee_tp=WORKER_FEE_RAW;
            else if ($worker_fee_type==="hex")
                $worker_fee_tp=WORKER_FEE_HEX;
            else {

                http_response_code(404);
                header($MIME_TYPE);
                echo '{"error":"111","reason":"Missing: Value type must be real|raw|hex"}';
                exit(0);

            }

        } else
            $worker_fee_tp=WORKER_FEE_REAL;

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            $p2pow_block=php_c_block_to_p2pow($block_bin, $worker_wallet, $worker_representative, $worker_fee, $worker_fee_tp);

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not create P2PoW block '.$e->getCode().'"}';
            exit(0);
        }

        try {

            $p2pow_block_hex=bin2hex($p2pow_block);

            echo '{"block":"'.$p2pow_block_hex.'"}';

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert to bin to hex string'.$e->getCode().'"}';

        }

        exit(0);

    }

    if ($cmd==="get_block_hash") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"108","reason":"Missing: Block"}';
            exit(0);

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            $res=php_c_get_block_hash($block_bin);

            header($MIME_TYPE);
            echo '{"hash":"'.$res.'"}';

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not calculate block hash '.$e->getCode().'"}';
            exit(0);
        }

        exit(0);

    }

    if ($cmd==="sign_p2pow_block") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"113","reason":"Missing: Block"}';
            exit(0);

        }

        $private_key=$_POST['private_key'];

        if (!isset($private_key)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"114","reason":"Missing: Private Key"}';
            exit(0);

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            php_c_sign_p2pow_block($block_bin, $private_key);

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not assign block with P2PoW '.$e->getCode().'"}';
            exit(0);
        }

        try {

            $block_hex=bin2hex($block_bin);

            header($MIME_TYPE);
            echo '{"block":"'.$block_hex.'"}';

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert bin to hex string '.$e->getCode().'"}';

        }

        exit(0);

    }

    if ($cmd==="calculate_work_from_block") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"116","reason":"Missing: Block"}';
            exit(0);

        }

        $n_thr=$_POST['n_thr'];

        if (isset($n_thr)) {

           if (is_numeric($n_thr))
               $number_of_threads=intval($n_thr);
           else {

                http_response_code(500);
                header($MIME_TYPE);
                echo '{"error":"118","reason":"Is not a number"}';
                exit(0);

           }

        } else {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"117","reason":"Missing: Number of threads"}';
            exit(0);

        }

        $threshold=$_POST['threshold'];

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            php_c_calculate_work_from_block($block_bin, $number_of_threads, isset($threshold)?$threshold:DEFAULT_NANO_POW_THRESHOLD);

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not calculate Proof of work of this block '.$e->getCode().'"}';
            exit(0);
        }

        try {

            $block_hex=bin2hex($block_bin);

            header($MIME_TYPE);
            echo '{"block":"'.$block_hex.'"}';

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert bin to hex string '.$e->getCode().'"}';

        }

        exit(0);

    }

    if ($cmd==="get_difficulty") {

        $hash=$_POST['hash'];

        if (!isset($hash)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"120","reason":"Missing: Hash"}';
            exit(0);

        }

        $work=$_POST['work'];

        if (!isset($work)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"120","reason":"Missing: Work"}';
            exit(0);

        }

        $threshold=$_POST['threshold'];


        try {

            $res=php_c_get_difficulty($hash, $work, isset($threshold)?$threshold:DEFAULT_NANO_POW_THRESHOLD);

            header($MIME_TYPE);
            echo $res;

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not calculate difficulty '.$e->getCode().'"}';
        }

        exit(0);

    }

    if ($cmd==="p2pow_to_json") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"112","reason":"Missing: Block"}';
            exit(0);

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        try {

            $res=php_c_p2pow_to_json($block_bin);

            header($MIME_TYPE);
            echo $res;

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not parse P2PoW to JSON '.$e->getCode().'"}';
            exit(0);
        }


        exit(0);

    }

    if ($cmd==="gen_seed_to_encrypted_stream") {

        $password=$_POST['password'];

        if (!isset($password)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"113","reason":"Missing: Password"}';
            exit(0);

        }

        $entropy=$_POST['entropy'];

        if (isset($entropy)) {

            if ($entropy==="paranoic")
                $entropy_sel=ENTROPY_TYPE_PARANOIC;
            else if ($entropy==="excelent")
                $entropy_sel=ENTROPY_TYPE_EXCELENT;
            else if ($entropy==="good")
                $entropy_sel=ENTROPY_TYPE_GOOD;
            else if ($entropy==="not_enough")
                $entropy_sel=ENTROPY_TYPE_NOT_ENOUGH;
            else if ($entropy==="not_recommended")
                $entropy_sel=ENTROPY_TYPE_NOT_RECOMENDED;
            else {

               http_response_code(404);
               header($MIME_TYPE);
               echo '{"error":"114","reason":"Invalid entropy type"}';
               exit(0);

            }

        } else
            $entropy_sel=ENTROPY_TYPE_PARANOIC;

        try {

            $encrypted_bin=php_c_gen_seed_to_encrypted_stream($entropy_sel, $password, 15, 64, PASS_MUST_HAVE_AT_LEAST_ONE_NUMBER|
                PASS_MUST_HAVE_AT_LEAST_ONE_SYMBOL|PASS_MUST_HAVE_AT_LEAST_ONE_UPPER_CASE|PASS_MUST_HAVE_AT_LEAST_ONE_LOWER_CASE);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);

            $info="";
            $error=$e->getCode();

            if ($error>0) {

                if ($error&PASS_MUST_HAVE_AT_LEAST_ONE_NUMBER)
                    $info="pass needs at least one number, ";

                if ($error&PASS_MUST_HAVE_AT_LEAST_ONE_SYMBOL)
                    $info.="pass needs at least one symbol, ";

                if ($error&PASS_MUST_HAVE_AT_LEAST_ONE_UPPER_CASE)
                    $info.="pass needs at least one upper case, ";

                if ($error&PASS_MUST_HAVE_AT_LEAST_ONE_LOWER_CASE)
                    $info.="pass needs at least one lower case";

                if ($error&PASS_IS_OUT_OVF)
                    $info.="pass is overflow";
                else if ($error&PASS_IS_TOO_SHORT)
                    $info.="pass is too short";
                else if ($error&PASS_IS_TOO_LONG)
                    $info.="pass is too long";

                echo '{"error":"500", "reason":"'.$e->getMessage().' Can not encrypt Nano SEED to stream '.$error.'","info":"'.$info.'"}';

            } else
                echo '{"error":"500", "reason":"'.$e->getMessage().' Can not encrypt Nano SEED to stream '.$error.'"}';

            exit(0);

        }

        try {

            $encrypted_hex=bin2hex($encrypted_bin);

            header($MIME_TYPE);
            echo '{"encrypted_seed":"'.$encrypted_hex.'"}';

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert bin to hex string '.$e->getCode().'"}';

        }

        exit(0);

    }

    if ($cmd==="encrypted_stream_to_seed") {

        $block=$_POST['block'];

        if (!isset($block)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"115","reason":"Missing: Block"}';
            exit(0);

        }

        try {

            $block_bin=hex2bin($block);

        } catch (Exception $e) {

            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert hex to bin '.$e->getCode().'"}';
            exit(0);

        }

        $password=$_POST['password'];

        if (!isset($password)) {

            http_response_code(404);
            header($MIME_TYPE);
            echo '{"error":"116","reason":"Missing: Password"}';
            exit(0);

        }

        try {

            $res=php_c_gen_encrypted_stream_to_seed($block_bin, $password);

            header($MIME_TYPE);
            echo $res;

        } catch (Exception $e) {
            http_response_code(500);
            header($MIME_TYPE);
            echo '{"error":"500", "reason":"'.$e->getMessage().' Can not convert encrypted stream to Nano SEED '.$e->getCode().'"}';
            exit(0);
        }

        exit(0);

    }

    if ($cmd==="library_info") {

       header($MIME_TYPE);
       echo php_c_library_info();

       exit(0);

    }

    if ($cmd==="license") {

       echo php_c_license();

       exit(0);

    }

    http_response_code(400);
    header($MIME_TYPE);
    echo '{"error":"400","reason":"Invalid command"}';
    exit(0);

}

http_response_code(400);
header($MIME_TYPE);
echo '{"error":"400","reason":"Only accepts POST method"}';

?>

