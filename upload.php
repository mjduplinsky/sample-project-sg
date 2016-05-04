<?php
	if(isset($_FILES['file'])) {
		echo "zzz";
		if(move_uploaded_file($_FILES["file"]["tmp_name"], "upload/".$_POST["filename"])) {
			echo 'Upload Success';
		} else {
			echo '#Fail';
		}
	} else {

	}
?>