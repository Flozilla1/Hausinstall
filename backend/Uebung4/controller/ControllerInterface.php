<?php
/**
 *
 * @author helmuth
 */
interface Controller {
    public function route($inputData);
    public function displayResponse($outputStream);
}
