import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="container">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="https://github.com/billowdev" className="nav-link px-2 text-muted">
              GitHub
            </a>
          </li>
        </ul>
        <p className="text-center text-muted">© 2022 BillowDev</p>
      </footer>
    </div>
  );
}
