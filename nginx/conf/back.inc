location ^~ /api {
    proxy_pass                          http://back;
    proxy_set_header Host               $host;
    proxy_set_header X-Real-IP          $remote_addr;
    proxy_set_header X-Forwarded-For    $remote_addr;
    proxy_set_header Port               $server_port;

    proxy_connect_timeout               60;
    proxy_send_timeout                  60;
    proxy_read_timeout                  60;
}

location ^~ /api/ {
    proxy_pass                          http://back;
    proxy_set_header Host               $host;
    proxy_set_header X-Real-IP          $remote_addr;
    proxy_set_header X-Forwarded-For    $remote_addr;
    proxy_set_header Port               $server_port;

    proxy_connect_timeout               60;
    proxy_send_timeout                  60;
    proxy_read_timeout                  60;
}
