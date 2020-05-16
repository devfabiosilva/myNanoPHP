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

