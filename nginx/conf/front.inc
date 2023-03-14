location ^~ / {
    if ($request_method = 'OPTIONS')
    {
        add_header 'Access-Control-Allow-Origin' "$http_origin";
        #
        # Om nom nom cookies
        #
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Methods' 'GET, PUT, POST, PATCH, DELETE, OPTIONS';
        #
        # Custom headers and headers various browsers *should* be OK with but aren't
        #
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
        #
        # Tell client that this pre-flight info is valid for 20 days
        #
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain charset=UTF-8';

        return 200 'GET, PUT, POST, PATCH, DELETE, OPTIONS';
    }

    proxy_pass                          http://front;
    proxy_set_header Host               $host;
    proxy_set_header X-Real-IP          $remote_addr;
    proxy_set_header X-Forwarded-For    $remote_addr;
    proxy_set_header Port               $server_port;

    proxy_connect_timeout               60;
    proxy_send_timeout                  60;
    proxy_read_timeout                  60;
}

location = /favicon.ico {
    proxy_pass	                        http://front;
    proxy_set_header Upgrade            $http_upgrade;
    proxy_set_header Connection         $http_connection;
    proxy_set_header Host               $host;
}

location ^~ /ng-cli-ws {
    proxy_pass	                        http://front;
    proxy_set_header Upgrade            $http_upgrade;
    proxy_set_header Connection         $http_connection;
    proxy_set_header Host               $host;
}

location ^~ /sockjs-node/ {
    proxy_pass	                        http://front;
    proxy_set_header Upgrade            $http_upgrade;
    proxy_set_header Connection         $http_connection;
    proxy_set_header Host               $host;
}

location ^~ /browser-sync/browser-sync-client.js {
    rewrite ^                           $scheme://$host/browser-sync/browser-sync-client.js permanent;
}
